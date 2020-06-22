import fs from "fs";
import { escape } from "./lib/regex";

/**
 * koa openapi 中间件
 * @param {Object} options 生成 openapi 中间件的参数
 * @param {String} options.url 路径，默认 /openapi
 * @param {String} options.version the version of api
 */
export default function({ url = "/openapi", file } = {}) {
  if (!url) throw new Error("url is required for openapi middleware");
  if (!file)
    throw new Error(
      "file is required for openapi middleware, could be stream or block"
    );

  const regex = new RegExp(escape(url));
  const fileReader = fs.readFileSync(file);

  return (ctx, next) => {
    if (ctx.url.match(regex)) {
      ctx.type = "text/yaml";
      ctx.body = fileReader;
    } else {
      return next();
    }
  };
}
