import { Schema } from "normalizr";
import { Saga, EffectMiddleware } from "redux-saga";
import { PutEffect } from "redux-saga/effects";
import { Reducer, Store } from "redux";
import { Component } from "React";

declare module "@36node/redux" {
  /**
   * endpoint result
   * 20x or 30x result
   */
  interface EpResult {
    body?: object | string;
    headers?: object;
  }

  /**
   * all boolean default false
   */
  interface Meta {
    append?: boolean; // append in state, not replace
    from?: string; // which url the action from
    invisible?: boolean; // will not show in state
    parallel?: boolean; // allow parallel running in saga
    rePut?: boolean; // allow reput
  }

  interface ErrorDetail {
    path: string;
    desc: string;
    code: number;
  }

  interface Error {
    name: string;
    type: string;
    message: string;
    details: [ErrorDetail];
  }

  type KeyFunction = (payload: object) => string;

  interface Action<T> {
    type: string;
    payload?: T;
    key: string;
    meta: Meta;
    error: Error;
  }

  type Endpoint<T> = (payload: T) => Promise<EpResult>;
  type ActionCreator<T> = (payload: T, meta?: Meta) => Action<T>;
  type ActionMaker<T> = (
    type: string,
    keyPattern: string | Function,
    initPayload: T,
    initMeta: Meta
  ) => ActionCreator<T>;
  type TypeActionMaker<T> = (
    keyPattern: string | Function,
    initPayload: T,
    initMeta: Meta
  ) => ActionCreator<T>;
  type Selector<T> = (state: object) => T;
  type SelectorMaker<T> = (key: string, initState?: T) => Selector<T>;
  type CheckAction = (action: Action<any>) => boolean;

  /********************************************
   * lib                                      *
   ********************************************/
  export function isAction(
    pattern: string | Function | [string],
    key?: string
  ): CheckAction;
  export const makeAction: ActionMaker<any>;

  export function tapOn(type: string, key: string, saga: Saga): Saga;
  export function tapOnLatest(type: string, key: string, saga: Saga): Saga;
  export function watchHelper(): Saga;

  export const makeReducer: (
    is: Function,
    r: Function
  ) => Reducer<any, Action<any>>;

  export const makeSelector: SelectorMaker<T>;
  export function configureStore(rootReducers: Object): Store;
  export function withSaga(...sagas: [Saga]): Component;

  /********************************************
   * assign                                   *
   ********************************************/
  interface AssignReducerRoot {
    assign: Reducer<any, Action<any>>;
  }

  export const assignReducerRoot: AssignReducerRoot;
  export const makeAssignSelector: SelectorMaker<any>;

  export function makeAssign(key: string, init?: any): ActionCreator<any>;

  /********************************************
   * toggle                                   *
   ********************************************/
  interface ToggleReducerRoot {
    toggle: Reducer<boolean, Action<any>>;
  }

  export const toggleReducerRoot: ToggleReducerRoot;
  export const makeToggleSelector: SelectorMaker<boolean>;

  export function makeToggle(
    key: string,
    init?: boolean
  ): ActionCreator<boolean>;

  /********************************************
   * cron                                     *
   ********************************************/

  interface CronStartPayload {}

  interface CronStopPayload {}

  interface CronResetPayload {}

  interface CronTickPayload {}

  interface CronTypes {
    START: string;
    STOP: string;
    RESET: string;
    TICK: string;
  }

  interface CronMakers {
    start: ActionCreator<CronStartPayload>;
    stop: ActionCreator<CronStopPayload>;
    reset: ActionCreator<CronResetPayload>;
    tick: ActionCreator<CronTickPayload>;
  }

  interface CronState {
    cursor: number;
    min: number;
    max: number;
    step: number;
    tickedAt: number;
    interval: number;
    running: boolean;
  }

  interface CronReducerRoot {
    cron: Reducer<CronState, Action<any>>;
  }

  export const cronTypes: CronTypes;
  export const isCron: CheckAction;
  export function makeCron(key: string): CronMakers;

  export const cronReducerRoot: CronReducerRoot;
  export const makeCronSelector: SelectorMaker<boolean>;

  export function tapCronTick(key: string, saga: Saga): void;
  export function watchCron(): void;

  /********************************************
   * form                                     *
   ********************************************/

  interface ResetFormPayload {}

  interface SaveFieldsPayload {}

  interface FormTypes {
    RESET: string;
    SAVE_FIELDS: string;
  }

  interface FormMaker {
    reset: ActionCreator<ResetFormPayload>;
    saveFields: ActionCreator<SaveFieldsPayload>;
  }

  interface FormState {
    fields: object;
  }

  interface FormReducerRoot {
    form: Reducer<FormState, Action<ResetFormPayload | SaveFieldsPayload>>;
  }

  export const formTypes: FormTypes;
  export const isForm: CheckAction;
  export function makeForm(key: string): FormMaker;

  export const formReducerRoot: FormReducerRoot;
  export const makeFormSelector: SelectorMaker<FormState>;

  /********************************************
   * progress                                     *
   ********************************************/

  interface ProgressState {
    pos: number;
    step: number;
    min: number;
    max: number;
  }
  type ProgressResetPayload = ProgressState;
  type ProgressUpdatePayload = number;
  interface ProgressTypes {
    RESET: string;
    INCREASE: string;
    DECREASE: string;
  }
  interface ProgressMakers {
    reset: ActionCreator<ProgressResetPayload>;
    increase: ActionCreator<ProgressUpdatePayload>;
    decrease: ActionCreator<ProgressUpdatePayload>;
  }
  interface ProgressReducerRoot {
    progress: Reducer<
      ProgressState,
      Action<ProgressUpdatePayload | ProgressResetPayload>
    >;
  }

  export const progressTypes: ProgressTypes;
  export const isProgress: CheckAction;
  export function makeProgress(key: string): ProgressMakers;

  export const progressReducerRoot: ProgressReducerRoot;
  export const makeProgressSelector: SelectorMaker<ProgressState>;

  /********************************************
   * api                                      *
   ********************************************/

  interface ApiActionTypes {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
  }

  interface CreateApiActionOpts {
    key?: string | KeyFunction;
    schema?: Schema;
    meta?: Meta;
  }

  interface MakeApiOpts<T> {
    payload: T;
    append: boolean;
  }

  interface ApiState {
    request: object;
    result: object | [object];
    total?: number;
    loading: boolean;
    meta?: Meta;
  }

  interface CreateApiSelectorOpts {
    schema?: Schema;
    selector?: Selector<ApiState>;
  }

  interface ApiReducerRoot {
    api: Reducer<ApiState, Action<any>>;
    entities: Reducer<ApiState, Action<any>>;
  }

  export function isApi(action: Action<any>): boolean;
  export function isRequest(action: Action<any>): boolean;
  export function isSuccess(action: Action<any>): boolean;
  export function isFailure(action: Action<any>): boolean;
  export function reputApi<A extends Action<any>>(action: A): PutEffect<A>;

  /**
   * make api types
   *
   * @param base base type
   */
  export function makeApiTypes(base: string): ApiActionTypes;

  /**
   *
   * @param types
   * @param endpoint
   * @param options
   */
  export function createApiMaker<T>(
    types: string,
    endpoint: Endpoint<T>,
    schema?: Schema
  ): TypeActionMaker<T>;

  export function makeApiReset(key: string): TypeActionMaker<ApiState>;

  /**
   * selector
   * @param key state key in store
   * @param schema schema of state.result
   */
  export function makeApiSelector(
    key: string,
    opts?: CreateApiSelectorOpts
  ): Selector<any>;

  /**
   * api sagas
   */
  export const watchApi: Saga;

  /**
   * api reducer root
   */
  export const apiReducerRoot: ApiReducerRoot;
}
