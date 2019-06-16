import { camelCaseKey } from "./lib";
import { get } from "lodash";
import { initState } from "./reducer";
import { createSelector } from "reselect";

export const makeStateSelector = path => state =>
  get(state.forms, path) || initState;

const createFormSelector = (key, reduxPath) => {
  const path = reduxPath || camelCaseKey(key);

  const stateSelector = makeStateSelector(path);

  return createSelector(
    stateSelector,
    state => {
      return state;
    }
  );
};

export default createFormSelector;
