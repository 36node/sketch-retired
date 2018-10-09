import fs from "fs";

import YAML from "js-yaml";
import { get, camelCase } from "lodash";
import is from "./util/is";
import request from "request";

/**
 * read file or fetch from remote
 *
 * @param {*} source target file or remote url
 * @returns {String} raw data from a file
 */

async function getFile(source) {
  return new Promise((resolve, reject) => {
    if (is.YML(source) || is.YAML(source) || is.JSON(source)) {
      // local file
      fs.readFile(source, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    } else if (is.URL(source)) {
      //fetch from remote
      const opts = { url: source };
      request(opts, (err, response) => {
        if (err) return reject(err);
        resolve(response.body);
      });
    } else {
      reject(new Error(`Unsupported source ${source}`));
    }
  });
}

/**
 * parse raw file data to json
 *
 * @param {String} data raw file data
 * @returns {Object} json
 */

function toJSON(data) {
  data = data.toString("utf8");
  try {
    return JSON.parse(data);
  } catch (e) {
    return YAML.safeLoad(data);
  }
}

/**
 * parse swagger
 *
 * @param {Object} swagger openapi object
 * @returns {Object} { info, servers, api, components }
 */

function parseSwagger(swagger) {
  const { paths, components, info, servers } = swagger;
  const api = {};

  for (const path in paths) {
    for (const method in paths[path]) {
      const { operationId, summary, tags, parameters, requestBody, responses, security } = paths[
        path
      ][method];

      // make sure some props must exist
      if (!operationId) throw new Error(`missing operationId for ${method} ${path}`);
      if (!tags && !tags[0]) throw new Error(`missing operation tag for ${method} ${path}`);

      // camelcase operationId
      const name = camelCase(operationId);

      // use 200/204 response, use http-errors as error responses. https://github.com/jshttp/http-errors
      const res200 = responses["200"] || responses[200];
      const res204 = responses["204"] || responses[204];
      const response = res200 || res204;
      if (!response) throw new Error(`missing 20X response for ${method} ${path}`);

      if (res200) {
        response.status = 200;
        response.content = get(response, ["content", "application/json"]);
      }

      if (res204) {
        response.status = 204;
        response.content = get(response, ["content", "application/json"]);
      }

      // requestBody
      if (requestBody) {
        requestBody.content = get(requestBody, ["content", "application/json"]);
      }

      // use tags[0] as api's name
      api[tags[0]] = api[tags[0]] || { name: tags[0], operations: [], ref: [] };

      api[tags[0]].operations.push({
        method,
        name,
        operationId,
        parameters,
        path,
        requestBody,
        response,
        summary,
        security,
      });
    }
  }

  return { info, servers, api, components };
}

/**
 * parse swagger file to expected structure
 *
 * @param {*} source file path or remote url
 * @returns { Object } { info, servers, api, components }
 */
export default async function parse(source) {
  let content, json, result;

  try {
    content = await getFile(source);
  } catch (e) {
    console.error("Can not load the content of the Swagger specification file");
    console.error(e);
    return;
  }

  try {
    json = toJSON(content);
  } catch (e) {
    console.error("Can not parse the content of the Swagger specification file");
    console.error(e);
    return;
  }

  try {
    result = parseSwagger(json);
  } catch (e) {
    console.error(e);
    return;
  }

  return result;
}
