/// <reference path='../typings/index.d.ts' />
import { get, union, setWith, clone, mergeWith, isArray } from "lodash";

import { isApi, isRequest, isFailure, isSuccess, isClear } from "./actions";
import { Apis } from "./saga";

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

  if (isClear(action)) {
    return initState;
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

export function entitiesReducer(state = {}, action) {
  if (action.payload && action.payload.entities) {
    return mergeWith(state, action.payload.entities, customizer);
  }
  return state;
}

/**
 * api root reducer
 * @param {Object} state state
 * @param {import("@36node/redux-api").Action} action action
 */
export function apiReducer(state = {}, action) {
  const { key } = action;

  if (isApi(action)) {
    // key not register
    const api = Apis.get(key);

    if (!api) {
      return state;
    }

    return setWith(
      { ...state },
      api.reduxPath,
      r(get(state, api.reduxPath), action),
      clone
    );
  }
  return state;
}

const apiReducers = {
  apis: apiReducer,
  entities: entitiesReducer,
};

export default apiReducers;
