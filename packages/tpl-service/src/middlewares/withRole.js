import { intersection } from "lodash";
import createError from "http-errors";

import { Role } from "../constants";

export default function(...roles) {
  /**
   * 中间件 检车是否拥有匹配的角色
   *
   * @param {import("koa").Context} ctx koa context
   * @param {import("koa").Next} next koa next
   */
  return async (ctx, next) => {
    const { jwt } = ctx.state;
    jwt.roles = jwt.roles || [];

    // 如果 拥有 ADMIN 角色，自动解析成所有角色
    if (jwt.roles.includes("ADMIN")) jwt.roles = Object.values(Role);

    const found = intersection(roles, jwt.roles);
    if (found.length === 0) {
      throw new createError.Forbidden(`Require roles ${roles.join(",")}`);
    }

    await next();
  };
}
