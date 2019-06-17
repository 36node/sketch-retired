import { endsWith, startsWith } from "lodash";
export const PREFIX = "@ASSIGN";

export const SET = "SET";

export const Types = {
  set: `${PREFIX}/${SET}`,
};

export function isAssign(action = {}) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}

export function isSet(action) {
  return isAssign(action) && endsWith(action.type, SET);
}
