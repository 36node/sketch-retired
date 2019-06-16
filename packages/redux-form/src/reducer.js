import {
  isChangeField,
  isRegisterField,
  isReset,
  isRegisterMutilFields,
  isChangeMutilFields,
  isForm,
} from "./action";
import { setWith, clone, get } from "lodash";
import { Forms } from "./forms";

/**
 * field init state
 */
export const initFieldState = {
  name: undefined, //field name
  dirty: false, // is dirty
  touched: false, // is touched
  value: undefined, // field value
  validating: undefined, // is validating
  errors: undefined, // validate errors
};

export const initState = {
  fields: {},
  meta: {},
};

function registerField(fields = {}, name, initialValue) {
  const originalField = get(fields, name);

  // if name had registered, register action lose efficacy
  if (originalField) {
    return fields;
  }

  const filedState = { ...initFieldState, name, value: initialValue };

  return {
    ...fields,
    [name]: filedState,
  };
}

function changeField(fields = {}, field = {}) {
  const { name, ...rest } = field;

  const newField = { ...(fields[name] || initFieldState), name, ...rest };

  return {
    ...fields,
    [name]: newField,
  };
}

function r(state = initState, action) {
  const { payload = {}, meta = {} } = action;

  if (isRegisterField(action)) {
    // need field name
    const { name, initialValue } = payload;
    if (!name) {
      return state;
    }

    const newFileds = registerField(state.fields, name, initialValue);

    return {
      ...state,
      fields: newFileds,
      meta,
    };
  }

  if (isRegisterMutilFields(action)) {
    const { fields = [] } = payload;

    const newFields = fields.reduce((acc, cur) => {
      const { name, initialValue } = cur;
      if (!name) {
        return acc;
      }

      return registerField(acc, name, initialValue);
    }, state.fields);

    return {
      ...state,
      fields: newFields,
      meta,
    };
  }

  if (isChangeField(action)) {
    const { name } = payload;
    if (!name) {
      return state;
    }

    const newFields = changeField(state.fields, payload);
    return {
      ...state,
      fields: newFields,
      meta,
    };
  }

  if (isChangeMutilFields(action)) {
    const { fields = [] } = payload;

    const newFields = fields.reduce((acc, cur) => {
      const { name } = cur;
      if (!name) {
        return acc;
      }

      return changeField(acc, cur);
    }, state.fields);

    return {
      ...state,
      fields: newFields,
      meta,
    };
  }

  if (isReset(action)) {
    const { initialValues = {} } = payload;

    const newFileds = {};
    for (const name in state.fields) {
      newFileds[name] = { ...initFieldState, value: initialValues[name] };
    }

    return {
      ...state,
      fields: newFileds,
      meta,
    };
  }

  return state;
}

export default function reducer(state = {}, action) {
  if (!isForm(action)) return state;
  const { key } = action;

  const form = Forms.get(key);

  if (!form) {
    return state;
  }

  return setWith(
    { ...state },
    form.reduxPath,
    r(get(state, form.reduxPath), action),
    clone
  );
}
