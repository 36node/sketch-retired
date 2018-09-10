import fs from "fs";
import path from "path";

import YAML from "js-yaml";

async function getFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, filePath), (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

function toJSON(content) {
  content = content.toString("utf8");
  try {
    return JSON.parse(content);
  } catch (e) {
    return YAML.safeLoad(content);
  }
}

function parseSwaggerJSON(obj) {
  const { paths } = obj;
  const result = {};

  for (const path in paths) {
    for (const method in paths[path]) {
      const { operationId, tags, parameters, requestBody, responses: origRes } = paths[path][
        method
      ];

      // make sure some props must exist
      if (!operationId) throw new Error(`missing operationId for ${method} ${path}`);
      if (!tags && !tags[0]) throw new Error(`missing operation tag for ${method} ${path}`);

      // parse responses
      // currently we only care about application/json
      const responses = [];
      for (let code in origRes) {
        const { content, description } = origRes[code];
        if (!content || !content["application/json"]) continue;
        if (code === "default") code = "500";
        const { schema } = content["application/json"];
        responses.push({ code, description, schema });
      }

      const name = tags[0]; // use first tag as api name
      const api = (result[name] = result[name] || { name, operations: [] });
      const operation = { method, path, name: operationId, parameters, requestBody, responses };
      api.operations.push(operation);
    }
  }

  return Object.values(result);
}

/**
 * parse swagger file to expected structure
 * @param {*} filePath file path
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
    result = parseSwaggerJSON(json);
  } catch (e) {
    console.error(e);
    return;
  }

  return result;
}
