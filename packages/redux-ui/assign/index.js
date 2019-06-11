import { ReduxUiBase } from "../base";
import { setOf } from "./action";
import { registerAssign } from "./assigns";

class Assign extends ReduxUiBase {
  constructor(key, reduxPath) {
    super(key, reduxPath);
  }

  get actions() {
    return {
      set: (assign, meta = {}) => ({
        type: setOf(this.key),
        key: this.key,
        meta,
        payload: {
          assign,
        },
      }),
    };
  }
}

export function createAssignActions(key, opts = {}) {
  if (!key) {
    throw new Error("Assign need A key");
  }
  const assign = new Assign(key, opts.reduxPath);
  registerAssign(key, assign);

  return assign.actions;
}

export { default as assignReducer } from "./reducer";

export { isAssign, isSet } from "./action";

export { default as createAssignSelector } from "./selector";
