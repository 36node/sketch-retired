import createError from "http-errors";

import { intersection } from "lodash";

export default function(operation, roles) {
  /**
   * 中间件 检查角色是否匹配
   *
   * @param {import("koa").Context} ctx koa context
   * @param {import("koa").Next} next koa next
   */
  return async (ctx, next) => {
    const { jwt } = ctx.state;

    const checkRoles = roles[operation];
    if (checkRoles.length > 0) {
      // 查找jwt.roles和roles是否有共同元素
      let ret = intersection(checkRoles, jwt.roles);
      if (!ret.length) {
        throw new createError.Forbidden(
          `Require roles ${checkRoles.join(" or ")}`
        );
      }
    }
    await next();
  };
}
