import { escape } from "./lib/regex";

/**
 * health 中间件
 * @param {Object} options 生成 health 中间件的参数
 * @param {String} options.url 路径，默认 /health
 * @param {String} options.version the version of api
 */
export default function({ url = "/health", version } = {}) {
  const regex = new RegExp(`${escape(url)}$`);
  return (ctx, next) => {
    if (ctx.url.match(regex)) {
      ctx.body = {
        version,
        status: "OK",
        load: 0.9,
        check: [
          {
            name: "mysql",
            status: "WARNING",
            reason:
              "db schema version (0.9.0) conflict with service api version (1.0.0)",
          },
          {
            name: "mongo",
            status: "OK",
          },
          {
            name: "sms-service",
            status: "ERROR",
            reason: "connection timeout",
          },
        ],
      };
    } else {
      return next();
    }
  };
}
