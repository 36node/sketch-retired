import { Reducer, Action } from "redux";
import { ReduxUiBase, BaseAction, BaseOpts } from "../base";

interface IncreaseAction extends BaseAction {
  payload: {
    step: Number;
  };
}

interface DecreaseAction extends BaseAction {
  payload: {
    step: Number;
  };
}

interface InitAction extends BaseAction {
  payload: {
    step: Number;
  };
}

interface Options extends BaseOpts {}

interface ProgressState {
  progress: {
    step: Number;
    min: Number;
    max: Number;
  };
}

interface ProgressActions {
  increase: (step: Number, meta?: Object) => IncreaseAction;
  decrease: (step: Number, meta?: Object) => DecreaseAction;
  init: (
    step: Number,
    min: Number,
    max: Number,
    meta?: Object
  ) => IncreaseAction;
}

declare class Progress extends ReduxUiBase {}

export function createProgressActions(
  key: String,
  opts: Options
): ProgressActions;

export function isProgress(action: BaseAction): Boolean;
export function isIncrease(action: BaseAction): Boolean;
export function isDecrease(action: BaseAction): Boolean;
export function isInit(action: BaseAction): Boolean;

export function createProgressSelector(
  key: String,
  reduxPath?: String
): (state: Object) => ProgressState;

export const progressReducer: Reducer;
