import { intersection } from "lodash";
import createError from "http-errors";

/**
 * make sure user has provided roles
 *
 * @param {String|Array} roles string or array, if string use comma to seperate. like roles = "USER,ADMIN"
 * @returns {Function} middleware async (ctx, next) => {}
 */
export const authorize = roles => async (ctx, next) => {
  let r;

  if (typeof roles === "string") r = roles.split(/\s*,\s*/);
  if (Array.isArray(roles)) r = roles;
  if (!r || r.length === 0) return next();

  const { user = {} } = ctx.session;
  const overlaps = intersection(r, user.roles);
  if (overlaps.length > 0) return next();
};

/**
 * make sure the param has right type
 *
 * @param {String} name param name
 * @param {*} param param itself
 * @param {String} type param type
 * @param {Boolean} required is requried
 * @returns {*} param with the right type
 */
export const makesure = (name, param, type, required) => {
  if (!param && required) throw new createError.BadRequest(`${name} is required`);

  try {
    if (type === "integer") return Number.parseInt(param, 10);
    if (type === "number") return Number.parseFloat(param);
    if (type === "boolean") return Boolean(param);
    if (type === "date" || type === "date-time") return new Date(param);
    if (type.prototype && type.prototype.constructor) return new type(param);
  } catch (err) {
    throw new createError.BadRequest(`${name} should be type ${type}: err.message`);
  }

  return param;
};
