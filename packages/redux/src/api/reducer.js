import { isArray, mergeWith, union } from "lodash";

import { isApi, isRequest, isFailure, isSuccess, RESET } from "./action";
import { makeReducer } from "../lib";

export const initState = {
  loading: false,
  result: [],
  request: {},
  total: 0,
};

function r(state = initState, action = {}) {
  const { payload = {}, error, meta = {} } = action;
  const { xTotalCount, result } = payload;
  const { append = false } = meta;

  if (isRequest(action)) {
    return { ...state, loading: true, request: payload };
  }

  if (isSuccess(action)) {
    return {
      ...state,
      loading: false,
      result: append ? union(state.result, result) : result,
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

  if (action.type === RESET) {
    return {
      ...initState,
      ...payload,
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
export const apiReducerRoot = {
  api: makeReducer(isApi, r),
  entities: entitiesReducer,
};
