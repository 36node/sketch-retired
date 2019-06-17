import { camelCaseKey } from "./lib";
import { get } from "lodash";
import { initState } from "./reducer";

export const makeStateSelector = path => state =>
  get(state.forms, path) || initState;

const createFormSelector = (key, reduxPath) => {
  const path = reduxPath || camelCaseKey(key);

  return makeStateSelector(path);
};

export default createFormSelector;
