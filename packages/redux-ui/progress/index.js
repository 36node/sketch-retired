import { Types } from "./action";
import { ReduxUiBase } from "../base";
import { registerProgress, Progresses } from "./progresses";

class Progress extends ReduxUiBase {
  constructor(key, reduxPath) {
    super(key, reduxPath);
  }

  get actions() {
    return {
      increase: (step = 1, meta = {}) => ({
        type: Types.increase,
        payload: { step },
        key: this.key,
        meta,
      }),
      decrease: (step = 1, meta = {}) => ({
        type: Types.decrease,
        payload: { step },
        key: this.key,
        meta,
      }),
      init: (step = 0, min = 0, max = 100, meta = {}) => ({
        type: Types.init,
        payload: { step, min, max },
        key: this.key,
        meta,
      }),
    };
  }
}

export function createProgressActions(key, opts = {}) {
  if (!key) {
    throw new Error("Progress need a key");
  }

  if (Progresses.get(key)) {
    return Progresses.get(key).actions;
  }

  const progress = new Progress(key, opts.reduxPath);

  registerProgress(progress);

  return progress.actions;
}

export { default as progressReducer } from "./reducer";

export { isProgress, Types as ProgressTypes } from "./action";

export { default as createProgressSelector } from "./selector";
