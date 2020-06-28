import { Role } from "../constants";

/**
 * 中间件 计算动态角色
 *
 * @param {import("koa").Context} ctx koa context
 * @param {import("koa").Next} next koa next
 */
export default async (ctx, next) => {
  const { jwt, pet = {} } = ctx.state;
  const { owner } = pet;
  jwt.roles = jwt.roles || [];

  // 注意这里 owner 是 mongo 的 objectId
  if (owner == jwt.user /*eslint-disable-line*/) {
    jwt.roles.push(Role.PET_STORE_OWNER);
  }

  return next();
};
