// @ts-check

import Ajv from "ajv";
import { get, merge, cloneDeep } from "lodash";
import Debug from "debug";

const debug = Debug("store:validate");

/**
 * override oneOf keywords support removeAdditional option
 * @param {import('ajv').Ajv} ajv
 */
function oneOfRA(ajv) {
  ajv.removeKeyword("oneOf");
  ajv.addKeyword("oneOf", {
    compile: function(schemas) {
      return function(data) {
        for (const schema of schemas) {
          const validator = ajv.compile(schema);

          // use clone data to prevent data modify
          const testData = cloneDeep(data);
          const ret = validator(testData);

          if (ret) {
            // modify data for removeAddtional
            validator(data);
            return ret;
          }
        }
        return false;
      };
    },
    modifying: true,
    metaSchema: {
      type: "array",
      items: [{ type: "object" }],
    },
    errors: false,
  });
}

/**
 * override allOf keywords support removeAdditional option
 * @param {import('ajv').Ajv} ajv
 */
function allOfRA(ajv) {
  ajv.removeKeyword("allOf");
  ajv.addKeyword("allOf", {
    macro: function(schema) {
      return merge({}, ...schema);
    },
    metaSchema: {
      type: "array",
      items: [{ type: "object" }],
    },
    errors: true,
  });
}

const ajv = new Ajv({
  coerceTypes: "array",
  removeAdditional: "all", // strip any property not in openapi.yml
  unknownFormats: ["int32"],
});

allOfRA(ajv);
oneOfRA(ajv);

const buildAjvErr = (errors = [], data) => ({
  type: "validation",
  details: errors
    .filter(error => error.keyword !== "allOf")
    .map(error => ({
      keyword: error.keyword,
      path: error.dataPath.replace(/^\./, ""),
      message: error.message,
      value: get(data, error.dataPath.replace(/^\./, "")),
    })),
});

export default (reqSchema, resSchema) => {
  return async (ctx, next) => {
    if (reqSchema) {
      const validateReq = ajv.compile(reqSchema);
      const req = {
        ...ctx.params,
        body: ctx.request.body,
        query: ctx.query,
        headers: ctx.headers,
        cookies: ctx.cookies,
      };
      if (!validateReq(req)) {
        ctx.throw(
          400,
          "request is invalid",
          buildAjvErr(validateReq.errors, req) // return first error
        );
      }
      debug("validate request success");
    }

    await next();

    if (resSchema) {
      const validateRes = ajv.compile(lowerCaseHeaders(resSchema));
      const res = {
        content: ctx.body,
        headers: ctx.response.headers,
        cookies: ctx.cookies,
      };
      if (!validateRes(res)) {
        debug("res.content %o", res);
        ctx.throw(
          500,
          "response is invalid",
          buildAjvErr(validateRes.errors, res)
        );
      }
      debug("validate response success");
    }
  };
};

/**
 * 忽略 headers 大小写，schema 也转成小写
 *
 * @param {object} schema 原始 schema
 * @returns {object} 供 ajv 校验使用的 schema
 */
function lowerCaseHeaders(schema) {
  if (!schema.properties || !schema.properties.headers) return schema;
  const headers = schema.properties.headers;
  const properties = Object.keys(headers.properties).reduce(
    (c, k) => ({ ...c, [k.toLowerCase()]: headers.properties[k] }),
    {}
  );
  return {
    ...schema,
    properties: {
      ...schema.properties,
      headers: {
        ...schema.headers,
        properties,
      },
    },
  };
}
