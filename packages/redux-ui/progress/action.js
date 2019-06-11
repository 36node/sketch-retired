import { endsWith, startsWith } from "lodash";

export const PREFIX = "@PROGRESS";

export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";
export const INIT = "INIT";

export function isProgress(action) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}

export function increaseOf(key) {
  return `${PREFIX}/${key}/${INCREASE}`;
}

export function isIncrease(action) {
  return isProgress(action) && endsWith(action.type, INCREASE);
}

export function decreaseOf(key) {
  return `${PREFIX}/${key}/${DECREASE}`;
}

export function isDecrease(action) {
  return isProgress(action) && endsWith(action.type, DECREASE);
}

export function initOf(key) {
  return `${PREFIX}/${key}/${INIT}`;
}

export function isInit(action) {
  return isProgress(action) && endsWith(action.type, INIT);
}
