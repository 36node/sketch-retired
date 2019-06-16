import { Reducer, Action } from "redux";

interface BaseAction extends Action {
  meta?: Object;
  key: String;
}

export class ReduxForm {
  key: String;
  reduxPath: String;
  actions: FormActions;
}

interface Option {
  reduxPath?: String;
}

interface FieldState {
  name: String; //field name
  dirty?: Boolean; // is dirty
  touched?: Boolean; // is touched
  value?: any; // field value
  validating?: Boolean; // is validating
  errors?: any; // validate errors
}

interface RegisterField {
  name: String;
  initialValue?: any;
}

interface Fields {
  [name: String]: FieldState;
}

interface FormState {
  fields: Fields;
  meta?: Object;
}

interface ResetAction extends BaseAction {
  payload?: { initialValues: Object };
}

interface RegisterFieldAction extends BaseAction {
  payload: RegisterField;
}

interface RegisterMutilFieldsAction extends BaseAction {
  payload: { fields: [RegisterField] };
}

interface ChangeFieldAction extends BaseAction {
  payload: FieldState;
}

interface ChangeMutilFieldsAction extends BaseAction {
  payload: { fields: [FieldState] };
}

interface FormActions {
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
  ) => SetAction;
  changeMutilFields: (
    fields: [FieldState],
    meta?: Object
  ) => ChangeMutilFieldsAction;
}

export function createFormActions(key: String, opts: Option): FormActions;

export function isForm(action: BaseAction): Boolean;
export function isChangeMutilFields(action: BaseAction): Boolean;
export function isRegisterMutilFields(action: BaseAction): Boolean;
export function isReset(action: BaseAction): Boolean;
export function isChangeField(action: BaseAction): Boolean;
export function isRegisterField(action: BaseAction): Boolean;

export const formReducer: Reducer;

export type FormSelector = (state: Object) => FormState;

export function createFormSelector(
  key: String,
  reduxPath?: String
): FormSelector;
