import { isArray, mergeWith, isNil } from "lodash";

const notMergeArray = (objValue, srcValue, key, object, source, stack) => {
  if (isArray(srcValue)) {
    return srcValue;
  }
};

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
  if (!type) {
    throw new Error("Type is required for action.");
  }

  let key = keyPattern;
  const rPayload =
    typeof payload === "object"
      ? mergeWith({}, initPayload, payload, notMergeArray)
      : isNil(payload)
      ? initPayload
      : payload;
  if (typeof keyPattern === "function") key = keyPattern(rPayload);

  return {
    type,
    key,
    payload: rPayload,
    meta: mergeWith({}, initMeta, meta, notMergeArray),
  };
};
