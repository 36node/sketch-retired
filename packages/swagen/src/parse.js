import { get, set, reduceRight, camelCase, merge } from "lodash";
import SwaggerParser from "swagger-parser";

/**
 * parse swagger
 *
 * @param {Object} swagger openapi object
 * @returns {Object} { info, servers, api, components }
 */

function parseSwagger(swagger) {
  const { paths, components, info, servers, security } = swagger;
  const api = {};

  for (const path in paths) {
    for (const method in paths[path]) {
      const {
        operationId,
        summary,
        tags,
        parameters,
        requestBody,
        responses,
        security,
      } = paths[path][method];

      // make sure some props must exist
      if (!operationId)
        throw new Error(`missing operationId for ${method} ${path}`);
      if (!tags && !tags[0])
        throw new Error(`missing operation tag for ${method} ${path}`);

      // camelcase operationId
      const name = camelCase(operationId);

      // use 200/204 response, use http-errors as error responses. https://github.com/jshttp/http-errors
      const res200 = responses["200"] || responses[200];
      const res201 = responses["201"] || responses[201];
      const res202 = responses["202"] || responses[202];
      const res204 = responses["204"] || responses[204];
      const response = res200 || res201 || res202 || res204;
      if (!response)
        throw new Error(`missing 20X response for ${method} ${path}`);

      if (res200) {
        response.status = 200;
        response.content = get(response, ["content", "application/json"]);
      }

      if (res201) {
        response.status = 201;
        response.content = get(response, ["content", "application/json"]);
      }

      if (res202) {
        response.status = 202;
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

  return { info, servers, api, components, security };
}

/**
 * 解析allOf
 * @param {*} schema openapi schema object
 */
function handleAllOf(schema) {
  if (!schema.allOf) return schema;

  return reduceRight(
    schema.allOf,
    (acc, cur) => {
      return merge(acc, handleAllOf(cur));
    },
    {}
  );
}

function handleSchemas(schemas = {}) {
  const ret = {};
  for (let key in schemas) {
    const schema = schemas[key];
    ret[key] = handleAllOf(schema);
  }
  return ret;
}

/**
 * parse swagger file to expected structure
 *
 * @param {*} source file path or remote url
 * @param {object} options {parse: true}
 * @param {object} options.dereference replace all $ref with normal js objects
 * @returns { Object } { info, servers, api, components }
 */
export default async function parse(source, options = {}) {
  let api, result;

  let dereferenceApi = await SwaggerParser.dereference(source);
  let unresolvedApi = await SwaggerParser.parse(source);

  // replace components schema with dereference object
  if (get(unresolvedApi, "components.schemas")) {
    set(
      unresolvedApi,
      "components.schemas",
      handleSchemas(get(dereferenceApi, "components.schemas"))
    );
  }

  try {
    if (options.dereference) {
      // replace all $ref with normal js objects
      api = await SwaggerParser.dereference(unresolvedApi);
    } else {
      // only parse swagger object, does not resolve $ref pointers or dereference anything
      api = unresolvedApi;
    }
  } catch (e) {
    console.error("Can not load the content of the Swagger specification file");
    console.error(e);
    return;
  }

  try {
    result = parseSwagger(api);
  } catch (e) {
    console.error(e);
    return;
  }

  return result;
}
