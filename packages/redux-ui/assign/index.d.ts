import { Reducer, Action } from "redux";
import { ReduxUiBase, BaseAction } from "../base";

interface SetAction extends BaseAction {
  payload: {
    assign: any;
  };
}

interface AssignActions {
  set: (assign: any, meta?: Object) => SetAction;
}

interface AssignOpts extends BaseOpts {}

interface AssignState {
  assign: any;
  meta?: Object;
}

declare class Assign extends ReduxUiBase {
  actions: AssignActions;
}

export function createAssignActions(
  key: String,
  opts?: AssignOpts
): AssignActions;

export const assignReducer: Reducer;

export function isAssign(action: BaseAction): Boolean;
export function isSet(action: SetAction): Boolean;

export function createAssignSelector(
  key: String,
  reduxPath?: String
): (state: Object) => AssignState;
