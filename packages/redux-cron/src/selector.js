import { camelCaseKey } from "./lib";
import { get } from "lodash";
import { initState } from "./reducer";

export const createCronSelector = (key, reduxPath) => {
  const path = reduxPath || camelCaseKey(key);
  return state => get(state.crons, path) || initState;
};
