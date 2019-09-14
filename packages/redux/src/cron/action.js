import { isAction, makeAction } from "../lib";

const PREFIX = "@@cron";

export const cronTypes = {
  START: `${PREFIX}/START`,
  STOP: `${PREFIX}/STOP`,
  RESET: `${PREFIX}/RESET`,
  TICK: `${PREFIX}/TICK`,
};

export const isCron = isAction(new RegExp(`^${PREFIX}/.*$`));

export const makeCron = (key = "default") => {
  return {
    start: makeAction(cronTypes.START, key),
    stop: makeAction(cronTypes.STOP, key),
    reset: makeAction(cronTypes.RESET, key),
    tick: makeAction(cronTypes.TICK, key),
  };
};
