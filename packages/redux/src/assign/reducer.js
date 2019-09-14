import { isAssign } from "./action";
import { makeReducer } from "../lib";

function r(state, action = {}) {
  return action.payload;
}

export const assignReducerRoot = {
  assign: makeReducer(isAssign, r),
};
