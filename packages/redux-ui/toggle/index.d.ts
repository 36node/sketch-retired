import { Reducer, Action } from "redux";
import { ReduxUiBase, BaseAction, BaseOpts } from "../base";

interface OpenAction extends BaseAction {}

interface CloseAction extends BaseAction {}

interface SetAction extends BaseAction {
  payload: {
    toggle: Boolean;
  };
}

interface ToggleActions {
  close: (meta?: Object) => CloseAction;
  open: (meta?: Object) => OpenAction;
  set: (toggle: Boolean, meta?: Object) => SetAction;
}

interface Options extends BaseOpts {}

interface ToggleState {
  toggle: Boolean;
  meta?: Object;
}

declare class Toggle extends ReduxUiBase {
  actions: ToggleActions;
}

export function createToggleActions(key: String, opts: Options): ToggleActions;

export const toggleReducer: Reducer;

export function isToggle(action: BaseAction): Boolean;

export function createToggleSelector(
  key: String,
  reduxPath?: String
): (state: Object) => ToggleState;

export const ToggleTypes: {
  close: String;
  open: String;
  set: String;
};
