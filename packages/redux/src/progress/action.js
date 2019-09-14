import { isAction, makeAction } from "../lib";

const PREFIX = "@@progress";

export const progressTypes = {
  INCREASE: `${PREFIX}/INCREASE`,
  DECREASE: `${PREFIX}/DECREASE`,
  RESET: `${PREFIX}/RESET`,
};

export const isProgress = isAction(new RegExp(`^${PREFIX}/.*$`));

export const makeProgress = (key = "default", initPayload, initMeta) => {
  return {
    increase: makeAction(progressTypes.INCREASE, key, initPayload, initMeta),
    decrease: makeAction(progressTypes.DECREASE, key, initPayload, initMeta),
    reset: makeAction(progressTypes.RESET, key, initPayload, initMeta),
  };
};
