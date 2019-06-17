import { endsWith, startsWith } from "lodash";

export const PREFIX = "@PROGRESS";

export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";
export const INIT = "INIT";

export const Types = {
  increase: `${PREFIX}/${INCREASE}`,
  decrease: `${PREFIX}/${DECREASE}`,
  init: `${PREFIX}/${INIT}`,
};

export function isProgress(action) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}

export function isIncrease(action) {
  return isProgress(action) && endsWith(action.type, INCREASE);
}

export function isDecrease(action) {
  return isProgress(action) && endsWith(action.type, DECREASE);
}

export function isInit(action) {
  return isProgress(action) && endsWith(action.type, INIT);
}
