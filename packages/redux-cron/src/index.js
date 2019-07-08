import { TYPES } from "./action";
import { registerCron, Crons } from "./crons";
import { camelCaseKey } from "./lib";

export class Cron {
  constructor(key, { reduxPath, onTick }) {
    this._key = key;

    this._onTick = onTick;
    this._reduxPath = camelCaseKey(reduxPath || key);
  }

  get key() {
    return this._key;
  }

  get reduxPath() {
    return this._reduxPath;
  }

  get onTick() {
    return this._onTick;
  }

  get actions() {
    return {
      start: (interval = 10000, meta = {}) => ({
        type: TYPES.START,
        payload: { interval },
        key: this.key,
        meta,
      }),
      stop: (meta = {}) => ({
        type: TYPES.STOP,
        key: this.key,
        meta,
      }),
      cancel: (meta = {}) => ({
        type: TYPES.CANCEL,
        key: this.key,
        meta,
      }),
    };
  }
}

export function createCronActions(key, opts = {}) {
  if (!key) {
    throw new Error("Corn need a key");
  }

  if (Crons.has(key)) {
    return Crons.get(key).actions;
  }

  const cron = new Cron(key, opts);
  registerCron(cron);

  return cron.actions;
}

export { default as cronReducer, CronStatus } from "./reducer";

export { default as watchCron } from "./saga";

export { TYPES as CronTypes } from "./action";

export { createCronSelector } from "./selector";
