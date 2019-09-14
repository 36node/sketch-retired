import { clone, get, isArray, setWith } from "lodash";

export * from "./humps";
export * from "./saga";

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

/**
 * Make 36node pattern reducer
 *
 * @param {Function} is is expected action
 * @param {Function} r sub reducer
 */
export const makeReducer = (is, r) => (state = {}, action = {}) => {
  if (!is(action) || !action.key) return state;

  return setWith(
    { ...state },
    action.key,
    r(get(state, action.key), action),
    clone
  );
};

/**
 * Make a standard selector
 *
 * @param {string} key key in store
 * @param {any} initState default value
 */
export const makeSelector = (key, initState = {}) => state => {
  if (!key) throw new Error("key is required for selector");
  return get(state, key) || initState;
};
