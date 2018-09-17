import fs from "fs";
import path from "path";

import YAML from "js-yaml";
import { get, camelCase } from "lodash";
import { upperFirst } from "lodash";

/**
 * get schema type
 *
 * @param {*} schema swagger schema object
 * @returns {String} parsed type
 */

function getSchemaType(schema = {}) {
  let { type, $ref } = schema;

  if (type === "integer") return "Number";
  if (type) return upperFirst(type);

  if ($ref) {
    const segs = $ref.split("/");
    if (segs.length < 2) {
      throw new Error(`ref pattern is wrong: ${$ref}`);
    }
    return `${segs[segs.length - 2]}.${upperFirst(segs[segs.length - 1])}`;
  }
}

/**
 * get schema name
 *
 * @param {*} schema swagger schema object
 * @returns {String} parsed schema name
 */

function getSchemaName(schema = {}) {
  let { type, items } = schema;

  if (type === "array") {
    return `${upperFirst(type)}<${getSchemaName(items)}>`;
  }

  return getSchemaType(schema);
}

/**
 * read file
 *
 * @param {*} filePath target file
 * @returns {String} raw data from a file
 */

async function getFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
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
 * parse response or requestbody's content
 *
 * @param {Object} content swagger's response or request body's content
 * @returns {Object} { name, type, schema }
 */

function parseContent(content) {
  // TODO: 如果是直接 $ref 的情况，需要解析一层
  const schema = get(content, ["application/json", "schema"]);

  if (!schema) throw new Error("200 response should have application/json content and schema");

  return {
    name: getSchemaName(schema),
    type: getSchemaType(schema),
    schema,
  };
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
      const { operationId, summary, tags, parameters, requestBody, responses } = paths[path][
        method
      ];

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
        Object.assign(response, parseContent(response.content));
      }

      if (res204) {
        response.status = 204;
      }

      // requestBody
      if (requestBody) {
        Object.assign(requestBody, parseContent(requestBody.content));
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
      });
    }
  }

  return { info, servers, api, components };
}

/**
 * parse swagger file to expected structure
 *
 * @param {*} filePath file path
 * @returns { Object } { info, servers, api, components }
 */
export default async function parse(filePath) {
  let content, json, result;

  try {
    content = await getFile(filePath);
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
