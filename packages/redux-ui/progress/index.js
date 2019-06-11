import { increaseOf, decreaseOf, initOf } from "./action";
import { ReduxUiBase } from "../base";
import { registerProgress } from "./progresses";

class Progress extends ReduxUiBase {
  constructor(key, reduxPath) {
    super(key, reduxPath);
  }

  get actions() {
    return {
      increase: (step = 1, meta = {}) => ({
        type: increaseOf(this.key),
        payload: { step },
        key: this.key,
        meta,
      }),
      decrease: (step = 1, meta = {}) => ({
        type: decreaseOf(this.key),
        payload: { step },
        key: this.key,
        meta,
      }),
      init: (step = 0, min = 0, max = 100, meta = {}) => ({
        type: initOf(this.key),
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

  const progress = new Progress(key, opts.reduxPath);

  registerProgress(progress);

  return progress.actions;
}

export { default as progressReducer } from "./reducer";

export { isProgress, isIncrease, isDecrease, isInit } from "./action";

export { default as createProgressSelector } from "./selector";
