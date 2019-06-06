import Koa = require("koa");

declare module "@36node/koa-health" {
  interface Options {
    url: string;
    version: string;
  }

  /**
   * health 中间件
   * @param {Object} options 生成 health 中间件的参数
   * @param {String} options.url 路径，默认 /health
   * @param {String} options.version the version of api
   */
  export function health(options: Options): Function;
}
