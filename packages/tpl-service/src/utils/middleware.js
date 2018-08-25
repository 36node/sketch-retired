import send from "koa-send";

/**
 * Static file middleware
 *
 * @param {string} path path to file
 * @returns {Function} middleware
 */
export const file = path => async ctx => {
  await send(ctx, path);
};
