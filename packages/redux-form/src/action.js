import { endsWith, startsWith } from "lodash";
export const PREFIX = "@FORM";

export function isForm(action = {}) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}

// rest form
export const RESET = "RESET";

export function isReset(action) {
  return isForm(action) && endsWith(action.type, RESET);
}

export function resetOf(key) {
  return `${PREFIX}/${key}/${RESET}`;
}

// register field
export const REGISTER_FIELD = "REGISTER_FIELD";

export function isRegisterField(action) {
  return isForm(action) && endsWith(action.type, REGISTER_FIELD);
}

export function registerFieldOf(key) {
  return `${PREFIX}/${key}/${REGISTER_FIELD}`;
}

// register mutil-fields
export const REGISTER_MUTIL_FIELDS = "REGISTER_MUTIL_FIELDS";

export function isRegisterMutilFields(action) {
  return isForm(action) && endsWith(action.type, REGISTER_MUTIL_FIELDS);
}

export function registerMutilFieldsOf(key) {
  return `${PREFIX}/${key}/${REGISTER_MUTIL_FIELDS}`;
}

// form field change
export const CHANGE_FIELD = "CHANGE_FIELD";

export function isChangeField(action) {
  return isForm(action) && endsWith(action.type, CHANGE_FIELD);
}

export function changeFieldOf(key) {
  return `${PREFIX}/${key}/${CHANGE_FIELD}`;
}

// change mutil-fields

export const CHANGE_MUTIL_FIELDS = "CHANGE_MUTIL_FIELDS";

export function isChangeMutilFields(action) {
  return isForm(action) && endsWith(action.type, CHANGE_MUTIL_FIELDS);
}

export function changeMutilFieldsOf(key) {
  return `${PREFIX}/${key}/${CHANGE_MUTIL_FIELDS}`;
}
