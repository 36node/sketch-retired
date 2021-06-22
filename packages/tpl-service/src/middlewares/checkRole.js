import createError from "http-errors";

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
      let ok = false;
      if (jwt.roles.length > 0) {
        for (let i = 0; i < checkRoles.length; i++) {
          for (let j = 0; j < jwt.roles.length; j++) {
            if (jwt.roles[j] === checkRoles[i]) {
              ok = true;
              break;
            }
          }
        }
      }

      if (!ok) {
        throw new createError.Forbidden(
          `Require roles ${checkRoles.join(" or ")}`
        );
      }
    }

    await next();
  };
}
