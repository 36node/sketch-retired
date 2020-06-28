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

  console.log("pet", pet);
  console.log("jwt", jwt);

  // 注意这里 owner 是 mongo 的 objectId
  if (owner && owner.equals(jwt.user)) {
    jwt.roles.push(Role.OWNER);
  }

  return next();
};
