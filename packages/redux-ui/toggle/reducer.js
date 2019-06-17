import { isToggle, Types } from "./action";
import { Toggles } from "./toggles";
import { setWith, clone, get } from "lodash";

export const initState = {
  toggle: false,
  meta: {},
};

function r(state = initState, action) {
  const { payload = {}, type, meta = {} } = action;

  if (type === Types.close) {
    return {
      ...state,
      toggle: false,
      meta,
    };
  }

  if (type === Types.open) {
    return {
      ...state,
      toggle: true,
      meta,
    };
  }

  if (type === Types.set) {
    const { toggle } = payload;
    return {
      ...state,
      toggle,
      meta,
    };
  }

  return state;
}

export default function reducer(state = {}, action) {
  if (!isToggle(action)) return state;

  const { key } = action;

  if (!key) return state;

  const toggle = Toggles.get(key);

  // toggle not registered
  if (!toggle) {
    return state;
  }

  return setWith(
    { ...state },
    toggle.reduxPath,
    r(get(state, toggle.reduxPath), action),
    clone
  );
}
