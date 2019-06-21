import {
  isArray,
  isObjectLike,
  isPlainObject,
  map,
  transform,
  set,
  camelCase,
} from "lodash";
import moment from "moment";

import history from "./history";

/**
 * add rounding function to Number class
 * @param {Number} number 需要定义精度的数
 * @param {Number} precision 精度，例如 0.1
 */
export function round(number, precision) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(number * multiplier) / multiplier;
}

/**
 * A delay promise
 * @param {Number} ms delay miliseconds
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Format time
 * @param {Date} date
 */
export function ymdhms(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

/**
 * Combine date and time
 * @param {Date} date
 * @param {Date} time
 */
export function combine(date, time) {
  const m = moment(date);
  m.hour(time.hour());
  m.minute(time.minute());
  m.second(time.second());
  return m;
}

function createIteratee(converter, self) {
  return (result, value, key) =>
    set(result, converter(key), isObjectLike(value) ? self(value) : value);
}

function createHumps(keyConverter) {
  return function humps(node) {
    if (isArray(node)) return map(node, humps);
    if (isPlainObject(node))
      return transform(node, createIteratee(keyConverter, humps));
    return node;
  };
}

/**
 * Make object keys camelcase
 */
export const humps = createHumps(camelCase);

/**
 * try to parse json string
 * if error log it
 *
 * @param {string} jsonStr string tobe parsed
 */
export function tryParseJson(jsonStr) {
  let result;
  try {
    if (jsonStr) result = JSON.parse(jsonStr);
  } catch (err) {
    console.error(err);
  } finally {
    return result;
  }
}

export { history };
