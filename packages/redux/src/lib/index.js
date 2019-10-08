import { clone, get, setWith } from "lodash";

export * from "./humps";
export * from "./injector";
export * from "./store";
export * from "./action";
export * from "./saga";

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
