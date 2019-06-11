import { endsWith, startsWith } from "lodash";
export const PREFIX = "@ASSIGN";

export const SET = "SET";

export function isAssign(action = {}) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}

export function setOf(key) {
  return `${PREFIX}/${key}/${SET}`;
}

export function isSet(action) {
  return isAssign(action) && endsWith(action.type, SET);
}
