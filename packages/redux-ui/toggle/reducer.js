import { isToggle, isClose, isOpen, isSet } from "./action";
import { Toggles } from "./toggles";
import { setWith, clone, get } from "lodash";

export const initState = {
  toggle: false,
  meta: {},
};

function r(state = initState, action) {
  const { payload = {}, meta = {} } = action;

  if (isClose(action)) {
    return {
      ...state,
      toggle: false,
      meta,
    };
  }

  if (isOpen(action)) {
    return {
      ...state,
      toggle: true,
      meta,
    };
  }

  if (isSet(action)) {
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
