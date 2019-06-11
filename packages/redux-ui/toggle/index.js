import { openOf, closeOf, setOf } from "./action";
import { registerToggle } from "./toggles";
import { ReduxUiBase } from "../base";

class Toggle extends ReduxUiBase {
  constructor(key, reduxPath) {
    super(key, reduxPath);
  }

  get actions() {
    return {
      open: (meta = {}) => ({
        type: openOf(this.key),
        key: this.key,
        meta,
      }),

      close: (meta = {}) => ({
        type: closeOf(this.key),
        key: this.key,
        meta,
      }),

      set: (toggle, meta = {}) => ({
        type: setOf(this.key),
        key: this.key,
        payload: { toggle },
        meta,
      }),
    };
  }
}

export function createToggleActions(key, opts = {}) {
  if (!key) {
    throw new Error("Toggle need a key");
  }
  const toggle = new Toggle(key, opts.reduxPath);
  registerToggle(toggle);
  return toggle.actions;
}

export { isToggle, isClose, isOpen, isSet } from "./action";

export { default as toggleReducer } from "./reducer";

export { default as toggleSelector } from "./selector";
