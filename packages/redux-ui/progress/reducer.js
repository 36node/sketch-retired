import { get, clone, setWith } from "lodash";
import { isProgress, Types } from "./action";
import { Progresses } from "./progresses";

export const initState = {
  step: 0,
  min: 0,
  max: 100,
  meta: {},
};

function min(a, b) {
  return b > a ? a : b;
}
function max(a, b) {
  return b > a ? b : a;
}

function r(state = initState, action) {
  const { payload = {}, meta = {}, type } = action;

  if (type === Types.increase) {
    return {
      ...state,
      step: min(state.max, state.step + payload.step),
      meta,
    };
  }

  if (type === Types.decrease) {
    return {
      ...state,
      step: max(state.min, state.step - payload.step),
      meta,
    };
  }

  if (type === Types.init) {
    return {
      ...state,
      ...payload,
      meta,
    };
  }

  return state;
}

export default function reducer(state = {}, action) {
  if (!isProgress(action)) return state;

  const { key } = action;

  if (!key) return state;

  const progress = Progresses.get(key);

  if (!progress) {
    return state;
  }

  return setWith(
    { ...state },
    progress.reduxPath,
    r(get(state, progress.reduxPath), action),
    clone
  );
}
