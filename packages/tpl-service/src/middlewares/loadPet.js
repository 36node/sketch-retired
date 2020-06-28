import createError from "http-errors";

import { Pet } from "../models";

/**
 * 中间件
 * 根据 petId 加载 pet
 *
 * @param {import("koa").Context} ctx koa context
 * @param {import("koa").Next} next koa next
 */
export default async (ctx, next) => {
  const { petId } = ctx.params;
  ctx.state.pet = await Pet.get(petId);
  if (!ctx.state.pet) {
    throw new createError.NotFound(`pet ${petId} not found`);
  }
  await next();
};
