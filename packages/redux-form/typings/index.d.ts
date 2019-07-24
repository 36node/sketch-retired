import { Reducer, Action } from "redux";

export interface BaseAction extends Action {
  meta?: Object;
  key: String;
}

export class ReduxForm {
  key: String;
  reduxPath: String;
  actions: FormActions;
}

export interface Option {
  reduxPath?: String;
}

export interface FieldState {
  name: String; //field name
  dirty?: Boolean; // is dirty
  touched?: Boolean; // is touched
  value?: any; // field value
  validating?: Boolean; // is validating
  errors?: any; // validate errors
}

export interface RegisterField {
  name: String;
  initialValue?: any;
}

export interface Fields {
  [name: String]: FieldState;
}

export interface FormState {
  fields: Fields;
  meta?: Object;
}

export interface ResetAction extends BaseAction {
  payload?: { initialValues: Object };
}

export interface RegisterFieldAction extends BaseAction {
  payload: RegisterField;
}

export interface RegisterMutilFieldsAction extends BaseAction {
  payload: { fields: [RegisterField] };
}

export interface ChangeFieldAction extends BaseAction {
  payload: FieldState;
}

export interface ChangeMutilFieldsAction extends BaseAction {
  payload: { fields: [FieldState] };
}

export interface FormActions {
  reset: (initialValues: Object, meta?: Object) => ResetAction;
  registerField: (name: String, meta?: Object) => RegisterFieldAction;
  registerMutilFields: (
    fields: [RegisterField],
    meta?: Object
  ) => RegisterMutilFieldsAction;
  changeField: (
    name: String,
    fieldState: FieldState,
    meta?: Object
  ) => ChangeFieldAction;
  changeMutilFields: (
    fields: [FieldState],
    meta?: Object
  ) => ChangeMutilFieldsAction;
}

export function createFormActions(key: String, opts: Option): FormActions;

export function isForm(action: BaseAction): Boolean;

export const formReducer: Reducer;

export type FormSelector = (state: Object) => FormState;

export function createFormSelector(
  key: String,
  reduxPath?: String
): FormSelector;

export const FormTypes: {
  reset: String;
  registerField: String;
  registerMutilFields: String;
  changeField: String;
  changeMutilFields: String;
};
