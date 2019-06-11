import { camelCaseKey } from "../lib";
import { get } from "lodash";
import { initState } from "./reducer";
import { createSelector } from "reselect";

export const makeStateSelector = path => state =>
  get(state.assigns, path) || initState;

const makeToggleSelector = (key, reduxPath) => {
  const path = reduxPath || camelCaseKey(key);

  const stateSelector = makeStateSelector(path);

  return createSelector(
    stateSelector,
    state => {
      return state;
    }
  );
};

export default makeToggleSelector;
