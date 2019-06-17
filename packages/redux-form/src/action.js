import { endsWith, startsWith } from "lodash";
export const PREFIX = "@FORM";

export function isForm(action = {}) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}

// rest form
export const RESET = "RESET";
// form field change
export const CHANGE_FIELD = "CHANGE_FIELD";
// change mutil-fields
export const CHANGE_MUTIL_FIELDS = "CHANGE_MUTIL_FIELDS";
// register field
export const REGISTER_FIELD = "REGISTER_FIELD";
// register mutil-fields
export const REGISTER_MUTIL_FIELDS = "REGISTER_MUTIL_FIELDS";

export const Types = {
  rest: `${PREFIX}/${RESET}`,
  registerField: `${PREFIX}/${REGISTER_FIELD}`,
  registerMutilFields: `${PREFIX}/${REGISTER_MUTIL_FIELDS}`,
  changeField: `${PREFIX}/${CHANGE_FIELD}`,
  changeMutilFields: `${PREFIX}/${CHANGE_MUTIL_FIELDS}`,
};

export function isReset(action) {
  return isForm(action) && endsWith(action.type, RESET);
}

export function isRegisterField(action) {
  return isForm(action) && endsWith(action.type, REGISTER_FIELD);
}

export function isRegisterMutilFields(action) {
  return isForm(action) && endsWith(action.type, REGISTER_MUTIL_FIELDS);
}

export function isChangeField(action) {
  return isForm(action) && endsWith(action.type, CHANGE_FIELD);
}

export function isChangeMutilFields(action) {
  return isForm(action) && endsWith(action.type, CHANGE_MUTIL_FIELDS);
}
