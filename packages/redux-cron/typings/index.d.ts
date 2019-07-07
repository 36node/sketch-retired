import { Reducer, Action } from "redux";
import { Selector } from "reselect";
import { Effect } from "redux-saga/effects";

declare module "@36node/redux-cron" {
  type OnTickFun = (count: number, actions: CronActions) => void;

  export interface Opts {
    onTick: OnTickFun | Action;
    reduxPath: string;
  }

  export interface BaseAction extends Action {
    key: string;
  }

  export interface StartAction extends BaseAction {
    interval: number;
  }

  export interface StopAction extends BaseAction {}

  export interface CancelAction extends BaseAction {}

  export interface CronActions {
    start: (interval?: number, meta?: Object) => StartAction;
    stop: (meta?: Object) => StopAction;
    cancel: (meta?: Object) => CancelAction;
  }

  declare type CronStatusType = "STOP" | "RUNNING";

  export interface CronState {
    count: number; // tick count
    lastAt: string; // last tick at
    lastStartAt: string; // last start at
    lastStopAt: string; // last stop at
    interval: number; // 当前设置的时间间隔
    status: CronStatusType; // 当前状态
  }

  export const cronReducer: Reducer;

  export function createCronSelector(
    key: string,
    reduxPath: string
  ): (state: Object) => CronState;

  export function createCronActions(key: string, opt: Opts): CronActions;

  export const CronTypes: {
    START: string;
    STOP: string;
  };

  export const CronStatus: {
    STOP: string;
    RUNNING: string;
  };

  export const watchCron: Effect;
}
