import { endsWith, startsWith } from "lodash";
export const PREFIX = "@TOGGLE";

export const OPEN = "OPEN";
export const CLOSE = "CLOSE";
export const SET = "SET";

export const Types = {
  open: `${PREFIX}/${OPEN}`,
  close: `${PREFIX}/${CLOSE}`,
  set: `${PREFIX}/${SET}`,
};

export function isToggle(action = {}) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}
