import { isToggle } from "./action";
import { makeReducer } from "../lib";

export const initState = false;

function r(state = initState, action) {
  const { payload = !state } = action;
  return payload;
}

export const toggleReducerRoot = {
  toggle: makeReducer(isToggle, r),
};
