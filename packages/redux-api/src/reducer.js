import { get, union, setWith, clone } from "lodash";

import { isApi, isRequest, isFailure, isSuccess } from "../actions/api";

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

export const initState = {
  loading: false,
  // result: null,
  request: {},
  meta: {},
};

function r(state = initState, action = {}) {
  const { payload = {}, error, meta = {} } = action;
  const { xTotalCount, result } = payload;
  const { append = false } = meta;

  if (isRequest(action)) {
    return { ...initState, loading: true, request: payload, meta };
  }

  if (isSuccess(action)) {
    return {
      ...state,
      loading: false,
      result: append ? union(result, state.result) : result,
      total: xTotalCount,
      meta: { ...state.meta, ...meta },
    };
  }

  if (isFailure(action)) {
    return {
      ...state,
      loading: false,
      error,
      meta: { ...state.meta, ...meta },
    };
  }

  return state;
}

/**
 * api root reducer
 * @param {Object} state state
 * @param {Action} action action
 */
export default function reducer(state = {}, action) {
  const { meta = {} } = action;
  const { key } = meta;

  if (key && isApi(action)) {
    return setWith({ ...state }, key, r(get(state, key), action), clone);
  }
  return state;
}
