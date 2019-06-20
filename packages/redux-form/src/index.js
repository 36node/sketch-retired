import { Types } from "./action";
import { registerForm, Forms } from "./forms";
import { camelCaseKey } from "./lib";

class Form {
  constructor(key, reduxPath) {
    this._key = key;
    if (!reduxPath) {
      this._reduxPath = camelCaseKey(key);
    }
  }

  get key() {
    return this._key;
  }

  get reduxPath() {
    return this._reduxPath;
  }

  get actions() {
    return {
      reset: (initialValues = {}, meta = {}) => ({
        type: Types.reset,
        key: this.key,
        payload: { initialValues },
        meta,
      }),
      registerField: (name, initialValue, meta = {}) => ({
        type: Types.registerField,
        key: this.key,
        payload: { name, initialValue },
        meta,
      }),
      registerMutilFields: (fields = [], meta = {}) => ({
        type: Types.registerMutilFields,
        key: this.key,
        payload: { fields },
        meta,
      }),
      changeField: (name, fieldState = {}, meta = {}) => ({
        type: Types.changeField,
        key: this.key,
        payload: { ...fieldState, name },
        meta,
      }),
      changeMutilFields: (fields = [], meta = {}) => ({
        type: Types.changeMutilFields,
        key: this.key,
        payload: { fields },
        meta,
      }),
    };
  }
}

export function createFormActions(key, opts = {}) {
  if (!key) {
    throw new Error("Form need a key");
  }

  if (Forms.has(key)) {
    return Forms.get(key).actions;
  }

  const form = new Form(key, opts.reduxPath);
  registerForm(form);
  return form.actions;
}

export { default as formReducer } from "./reducer";

export { default as createFormSelector } from "./selector";

export { Types as FormTypes, isForm } from "./action";
