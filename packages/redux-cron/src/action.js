import { startsWith } from "lodash";
export const PREFIX = "@CRON";

export function isCron(action = {}) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}

// start cron
export const START = "START";

// stop cron
export const STOP = "STOP";

// cancel cron
export const CANCEL = "CANCEL";

// cron tick
export const TICK = "TICK";

export const TYPES = {
  START: `${PREFIX}/${START}`,
  STOP: `${PREFIX}/${STOP}`,
  CANCEL: `${PREFIX}/${CANCEL}`,
  TICK: `${PREFIX}/${TICK}`,
};
