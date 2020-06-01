import Ajv from "ajv";
import { get } from "lodash";

const ajv = new Ajv({ coerceTypes: true });

const buildErr = (errors, data) => ({
  type: "validation",
  details: errors.map(item => ({
    keyword: item.keyword,
    path: item.dataPath.replace(/^\./, ""),
    message: item.message,
    value: get(data, item.dataPath.replace(/^\./, "")),
  })),
});

export default (reqSchema, resSchema) => {
  return async (ctx, next) => {
    const validateReq = ajv.compile(reqSchema);
    const req = {
      ...ctx.params,
      query: ctx.query, // before normalize
      headers: ctx.headers,
      cookies: ctx.cookies,
    };
    if (!validateReq(req)) {
      ctx.throw(400, `request is invalid`, buildErr(validateReq.errors, req));
    }

    await next();

    const validateRes = ajv.compile(resSchema);
    const res = {
      content: ctx.body,
      headers: ctx.response.headers,
      cookies: ctx.cookies,
    };
    if (!validateRes(res)) {
      ctx.throw(500, `response is invalid`, buildErr(validateRes.errors, res));
    }
  };
};
