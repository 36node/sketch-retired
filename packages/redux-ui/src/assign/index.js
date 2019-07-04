import { ReduxUiBase } from "../base";
import { Types } from "./action";
import { registerAssign, Assigns } from "./assigns";

class Assign extends ReduxUiBase {
  get actions() {
    return {
      set: (assign, meta = {}) => ({
        type: Types.set,
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

  if (Assigns.has(key)) {
    return Assigns.get(key).actions;
  }

  const assign = new Assign(key, opts.reduxPath);
  registerAssign(key, assign);

  return assign.actions;
}

export { default as assignReducer } from "./reducer";

export { isAssign, Types as AssignTypes } from "./action";

export { default as createAssignSelector } from "./selector";
