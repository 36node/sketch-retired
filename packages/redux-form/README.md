# Redux form

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
