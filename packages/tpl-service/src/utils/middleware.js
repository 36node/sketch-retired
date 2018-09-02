import { readFile } from "fs-extra";

/**
 * Static file middleware
 *
 * @param {string} path path to file
 * @returns {Function} middleware
 */
export const openapi = path => async (ctx, next) => {
  if (ctx.path.includes("/openapi.yml")) {
    ctx.type = "yaml";
    ctx.body = await readFile(path);
  } else {
    await next();
  }
};
