import { isArray } from "lodash";

/**
 * Is an action of @36node/redux
 *
 * @param {string|RegExp|[string]} pattern expected type or regex
 * @param {string} key expected key
 */
export const isAction = (pattern, key) => action => {
  if (typeof action !== "object") return false;
  if (key && key !== action.key) return false;
  if (typeof pattern === "function") return pattern(action);
  if (pattern instanceof RegExp) return pattern.test(action.type);
  if (isArray(pattern)) return pattern.includes(action.type);
  return action.type === pattern;
};

/**
 * Make a standard action creator
 *
 * @param {string} type type of action
 * @param {string|Function} keyPattern key of action
 * @param {any} initPayload pre defined payload
 * @param {object} initMeta pre defined meta
 */
export const makeAction = (type, keyPattern, initPayload, initMeta = {}) => (
  payload,
  meta = {}
) => {
  let key = keyPattern;
  const rMeta = { ...initMeta, ...meta };
  const rPayload =
    typeof payload === "object"
      ? { ...initPayload, ...payload }
      : payload || initPayload;

  if (typeof keyPattern === "function") key = keyPattern(rPayload);

  if (!type) {
    throw new Error("Type is required for action.");
  }

  return {
    type,
    key,
    payload: rPayload,
    meta: rMeta,
  };
};
