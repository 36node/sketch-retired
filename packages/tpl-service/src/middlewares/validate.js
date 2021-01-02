// @ts-check

import Ajv from "ajv";
import { get, merge, cloneDeep } from "lodash";
import Debug from "debug";
import mem from "mem";

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
      const validateReq = ajv.compile(memLowerCaseReqHeader(reqSchema));
      const req = {
        ...ctx.params,
        body: ctx.request.body,
        query: ctx.query,
        headers: ctx.header,
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
      const validateRes = ajv.compile(resSchema);
      const res = {
        body: ctx.body,
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
 * 忽略请求中的header大小写
 */
function lowerCaseReqHeaders(schema) {
  if (!schema.properties || !schema.properties.header) return schema;

  const { header, ...rest } = schema.properties;
  const newHeader = { ...header };

  const { required = [], properties } = header;

  if (required) newHeader.required = required.map(r => r.toLowerCase());

  if (properties) {
    newHeader.properties = Object.keys(properties).reduce(
      (c, k) => ({
        ...c,
        [k.toLowerCase()]: properties[k],
      }),
      {}
    );
  }

  return {
    ...schema,
    properties: {
      ...rest,
      headers: newHeader,
    },
  };
}

export const memLowerCaseReqHeader = mem(lowerCaseReqHeaders, {
  cacheKey: JSON.stringify,
});
