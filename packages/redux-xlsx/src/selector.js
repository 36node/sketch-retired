import { camelCaseKey } from "./lib";
import { get } from "lodash";
import { initState } from "./reducer";
import { createSelector } from "reselect";

export const createStateSelector = path => state =>
  get(state.xlsxs, path) || initState;

export const createXlsxSelector = (key, reduxPath) => {
  const path = reduxPath || camelCaseKey(key);
  return createStateSelector(path);
};

export const createImportSelector = (key, reduxPath) => {
  return createSelector(
    createXlsxSelector(key, reduxPath),
    state => {
      return state.import;
    }
  );
};

export const createExportSelector = (key, reduxPath) => {
  return createSelector(
    createXlsxSelector(key, reduxPath),
    state => {
      return state.export;
    }
  );
};
