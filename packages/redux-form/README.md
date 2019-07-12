# Redux form

[![version][0]][1] [![downloads][2]][3]

## Use

### Config redux

```js
import { formReducer } from "@36node/redux-form";

export default combineReducers({
  forms: formReducer,
});
```

### Actions

```js
import { createFormActions } from "@36node/redux-form";

const formActions = createFormActions("someKey");

dispatch(formActions.reset());

// Actions:

interface FormActions {
  // reset form with initialValues(Optional)
  reset: (initialValues: Object, meta?: Object) => ResetAction;
  // register field, note: once one name of field had registerred, repeat register action will be no effect
  registerField: (name: String, meta?: Object) => RegisterFieldAction;
  // register mutil fields, note: once one name of field had registerred, repeat register action will be no effect
  registerMutilFields: (
    fields: [{ name: String, initialValue: any }],
    meta?: Object
  ) => RegisterMutilFieldsAction;
  // change field state by name
  changeField: (
    name: String,
    fieldState: {
      name: String, //field name
      dirty?: Boolean, // is dirty
      touched?: Boolean, // is touched
      value?: any, // field value
      validating?: Boolean, // is validating
      errors?: any, // validate errors
    },
    meta?: Object
  ) => SetAction;
  // change mutil field state
  changeMutilFields: (
    fields: [
      {
        name: String, //field name
        dirty?: Boolean, // is dirty
        touched?: Boolean, // is touched
        value?: any, // field value
        validating?: Boolean, // is validating
        errors?: any, // validate errors
      },
    ],
    meta?: Object
  ) => ChangeMutilFieldsAction;
}
```

### selector

```js
import { createFormSelector } from "@36node/redux-form";

const formSelector = createFormSelector("someKey"),

const state = formSelector(state);

// Form State:

interface FormState {
  fields: {
    [name: String]: {
      name: String; //field name
      dirty?: Boolean; // is dirty
      touched?: Boolean; // is touched
      value?: any; // field value
      validating?: Boolean; // is validating
      errors?: any; // validate errors
    };
  };
  meta?: Object;
}

```

[0]: https://img.shields.io/npm/v/@36node/redux-form.svg?style=flat
[1]: https://npmjs.com/package/@36node/redux-form
[2]: https://img.shields.io/npm/dm/@36node/redux-form.svg?style=flat
[3]: https://npmjs.com/package/@36node/redux-form
