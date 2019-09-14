import { min, max } from "lodash";

import { isProgress, progressTypes } from "./action";
import { makeReducer } from "../lib";

export const initState = {
  pos: 0,
  step: 1,
  min: 0,
  max: 100,
};

function r(state = initState, action = {}) {
  const { type, payload /*, meta = {}*/ } = action;

  switch (type) {
    case progressTypes.RESET:
      return {
        ...state,
        pos: 0,
        ...payload,
      };
    case progressTypes.INCREASE:
      return {
        ...state,
        pos: min([state.pos + (payload || state.step), state.max]),
      };
    case progressTypes.DECREASE:
      return {
        ...state,
        pos: max([state.pos - (payload || state.step), state.min]),
      };
    default:
      return state;
  }
}

export const progressReducerRoot = {
  progress: makeReducer(isProgress, r),
};
