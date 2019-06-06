import Koa = require("koa");

declare module "@36node/koa-openapi" {
  interface Options {
    url: string;
    file: string;
  }

  /**
   * openapi 中间件
   * @param {Object} options 生成 openapi 中间件的参数
   * @param {String} options.url 路径，默认 /openapi
   * @param {String} options.file openapi.yml文件路径
   */
  export function openapi(options: Options): Function;
}
