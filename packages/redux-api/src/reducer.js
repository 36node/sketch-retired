/// <reference path='../typings/index.d.ts' />

import { get, union, setWith, clone, mergeWith, isArray } from "lodash";

import { isApi, isRequest, isFailure, isSuccess } from "./action";

export const initState = {
  loading: false,
  result: null,
  request: {},
  meta: {},
  total: 0,
};

function r(state = initState, action = {}) {
  const { payload = {}, error, meta = {} } = action;
  const { xTotalCount, result } = payload;
  const { append = false } = meta;

  if (isRequest(action)) {
    return { ...state, loading: true, request: payload, meta };
  }

  if (isSuccess(action)) {
    return {
      ...state,
      loading: false,
      result: append ? union(result, state.result) : result,
      total: xTotalCount && Number(xTotalCount),
    };
  }

  if (isFailure(action)) {
    return {
      ...state,
      loading: false,
      error,
    };
  }

  return state;
}

const customizer = (objValue, srcValue, key, object, source, stack) => {
  if (stack.size === 2) {
    // will not merge array
    if (isArray(srcValue)) {
      return srcValue;
    }
  }
};

/**
 * entities reducer
 */
function entitiesReducer(state = {}, action) {
  if (action.payload && action.payload.entities) {
    return mergeWith({}, state, action.payload.entities, customizer);
  }
  return state;
}

/**
 * api root reducer
 */
function apiReducer(state = {}, action = {}) {
  if (!isApi(action)) return state;

  const { key } = action;
  return setWith({ ...state }, key, r(get(state, key), action), clone);
}

/**
 * @type {import("@36node/redux-api").apiReducers}
 */
export const apiReducers = {
  api: apiReducer,
  entities: entitiesReducer,
};
