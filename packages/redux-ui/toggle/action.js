import { endsWith, startsWith } from "lodash";
export const PREFIX = "@TOGGLE";

export const OPEN = "OPEN";
export const CLOSE = "CLOSE";
export const SET = "SET";

export function isToggle(action = {}) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}

export function openOf(key) {
  return `${PREFIX}/${key}/${OPEN}`;
}

export function isOpen(action) {
  return isToggle(action) && endsWith(action.type, OPEN);
}

export function closeOf(key) {
  return `${PREFIX}/${key}/${CLOSE}`;
}

export function isClose(action) {
  return isToggle(action) && endsWith(action.type, CLOSE);
}

export function setOf(key) {
  return `${PREFIX}/${key}/${SET}`;
}

export function isSet(action) {
  return isToggle(action) && endsWith(action.type, SET);
}
