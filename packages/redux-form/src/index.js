import {
  resetOf,
  registerFieldOf,
  changeFieldOf,
  registerMutilFieldsOf,
  changeMutilFieldsOf,
} from "./action";
import { registerForm } from "./forms";
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
        type: resetOf(this.key),
        key: this.key,
        payload: { initialValues },
        meta,
      }),
      registerField: (name, initialValue, meta = {}) => ({
        type: registerFieldOf(this.key),
        key: this.key,
        payload: { name, initialValue },
        meta,
      }),
      registerMutilFields: (fields = [], meta = {}) => ({
        type: registerMutilFieldsOf(this.key),
        key: this.key,
        payload: { fields },
        meta,
      }),
      changeField: (name, fieldState = {}, meta = {}) => ({
        type: changeFieldOf(this.key),
        key: this.key,
        payload: { ...fieldState, name },
        meta,
      }),
      changeMutilFields: (fields = [], meta = {}) => ({
        type: changeMutilFieldsOf(this.key),
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

  const form = new Form(key, opts.reduxPath);
  registerForm(form);
  return form.actions;
}

export {
  isForm,
  isChangeField,
  isRegisterField,
  isReset,
  isChangeMutilFields,
  isRegisterMutilFields,
} from "./action";

export { default as formReducer } from "./reducer";

export { default as createFormSelector } from "./selector";
