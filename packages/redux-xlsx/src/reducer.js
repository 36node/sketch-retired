import { makeReducer } from "@36node/redux";

import { xlsxTypes, isXlsx } from "./action";

export const initState = {
  importing: false,
  exporting: false,
  error: {},
  result: [],
};

function r(state = initState, action = {}) {
  const { payload = {}, type, error } = action;

  switch (type) {
    case xlsxTypes.IMPORT_START:
      return {
        ...initState,
        importing: true,
      };
    case xlsxTypes.IMPORT_SUCCESS:
      return {
        ...state,
        importing: false,
        result: payload,
      };
    case xlsxTypes.IMPORT_FAILURE:
      return {
        ...state,
        importing: false,
        error,
      };
    case xlsxTypes.EXPORT_START:
      return {
        ...initState,
        exporting: true,
        ...payload,
      };
    case xlsxTypes.EXPORT_SUCCESS:
      return {
        ...state,
        exporting: false,
        ...payload,
      };
    case xlsxTypes.EXPORT_FAILURE:
      return {
        ...state,
        exporting: false,
        error,
      };
    default:
      return state;
  }
}

export const xlsxReducerRoot = {
  xlsx: makeReducer(isXlsx, r),
};
