import { get, endsWith, startsWith } from "lodash";

/**
 * @typedef {Object} Action
 * @property {string} type action type
 * @property {Object} payload action payload
 * @property {Object} meta Meta
 */

/**
 * @typedef {Object} Meta
 * @property {string} key 对应 state 中的 key, 可以嵌套形式例如 "a.b" 或者 ["a", "b"]
 * @property {boolean} append 是否将结果 append 到上一次的 action 结果里
 */

export const prefix = "@@api";
export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

/**
 * make api action types
 * @param {string} base base name
 */
export const makeTypes = base => ({
  request: `${prefix}/${base}_${REQUEST}`,
  success: `${prefix}/${base}_${SUCCESS}`,
  failure: `${prefix}/${base}_${FAILURE}`,
});

/**
 * 判断 action 是否 api action
 * @param {Action} action action
 */
export function isApi(action) {
  const { meta = {} } = action;
  const { key } = meta;
  return key && startsWith(action.type, prefix);
}

export function getBase(type) {
  const pattern = new RegExp(
    `${prefix}/(.*)_(${REQUEST}|${SUCCESS}|${FAILURE})`
  );
  const arr = type.match(pattern);
  if (arr && arr.length > 1) return arr[1];
}

/**
 * 判断 action 是否是 origin 的结果
 * @param {Action} origin 原始 action
 * @returns {function(Action)=>Boolean} 结果 action
 */
export const isApiResult = origin => action => {
  const originKey = get(origin, "meta.key");
  const key = get(action, "meta.key");
  const originBase = getBase(origin.type);
  const actionBase = getBase(action.type);

  return (
    originKey === key &&
    originBase === actionBase &&
    (isSuccess(action) || isFailure(action))
  );
};

/**
 * 返回请求的成功类型
 * @param {string} requestType 请求type
 */
export function successOf(requestType) {
  return requestType.replace(REQUEST, SUCCESS);
}

/**
 * 返回请求的失败类型
 * @param {string} requestType 请求type
 */
export function failureOf(requestType) {
  return requestType.replace(REQUEST, FAILURE);
}

/**
 * 判断是否是 request action
 * @param {Action} action 结果 action
 */
export function isRequest(action) {
  return isApi(action) && endsWith(action.type, REQUEST);
}

/**
 * 判断是否是成功 action
 * @param {Action} action 结果 action
 */
export function isSuccess(action) {
  return isApi(action) && endsWith(action.type, SUCCESS);
}

/**
 * 判断是否是失败 action
 * @param {Action} action 结果 action
 */
export function isFailure(action) {
  return isApi(action) && endsWith(action.type, FAILURE);
}
