import { Types } from "./action";
import { registerToggle, Toggles } from "./toggles";
import { ReduxUiBase } from "../base";

class Toggle extends ReduxUiBase {
  get actions() {
    return {
      open: (meta = {}) => ({
        type: Types.open,
        key: this.key,
        meta,
      }),

      close: (meta = {}) => ({
        type: Types.close,
        key: this.key,
        meta,
      }),

      set: (toggle, meta = {}) => ({
        type: Types.set,
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

  if (Toggles.has(key)) {
    return Toggles.get(key).actions;
  }

  const toggle = new Toggle(key, opts.reduxPath);
  registerToggle(toggle);
  return toggle.actions;
}

export { isToggle, Types as ToggleTypes } from "./action";

export { default as toggleReducer } from "./reducer";

export { default as createToggleSelector } from "./selector";
