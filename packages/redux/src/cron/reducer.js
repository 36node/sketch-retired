import { isCron, cronTypes } from "./action";
import { makeReducer } from "../lib";

export const initState = {
  pos: 0,
  min: 0,
  max: Number.MAX_VALUE,
  step: 1,
  tickedAt: undefined, // last time tick
  interval: 1000, // tick interval
  running: false,
};

function r(state = initState, action = {}) {
  const { payload = {}, type } = action;
  switch (type) {
    case cronTypes.START:
      return {
        ...state,
        running: true,
        ...payload,
      };
    case cronTypes.STOP:
      return {
        ...state,
        running: false,
      };
    case cronTypes.RESET:
      return {
        ...state,
        pos: state.min,
        ...payload,
      };
    case cronTypes.TICK:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export const cronReducerRoot = {
  cron: makeReducer(isCron, r),
};
