import { Schema } from "normalizr";
import { SagaIterator } from "redux-saga";
import { Reducer } from "redux";

declare module "@36node/redux-api" {
  /**
   * endport result
   * 20x or 30x result
   */
  interface EpResult {
    body?: object | string;
    headers?: object;
  }

  interface Meta {
    append?: Boolean;
  }

  interface Action {
    type: string;
    payload?: object;
    key: string;
    meta: Meta;
  }

  interface ApiReducers {
    apis: Reducer;
    entities: Reducer;
  }

  interface ApiCreateOpts<T> {
    endpoint: Endpoint<T>;
    schema?: Schema;
    reduxPath?: String;
  }

  interface ApiState {
    result: object | [object];
    total: number;
    loading: boolean;
    meta: object;
  }

  interface Hooks {
    beforeRequest?: (key: String, action: Action, api: Api) => Boolean;
    afterRequest?: (key: String, action: Action, api: Api) => void;
  }

  interface ApiActions<T> {
    request: (payload: T, meta: Object) => Action;
    clear: (meta: Object) => Action;
    refresh: (meta: Object) => Action;
  }

  export type Selector = (state: Object) => ApiState;
  export type Endpoint<T> = (payload: T) => Promise<EpResult>;

  export const apiReducers: ApiReducers;

  export function apiReducer(state: Object, action: Action): void;

  export function entitiesReducer(state: Object, action: Action): void;

  export function* watchApis(): void;

  export function registerHooks(hooks: Hooks): void;

  export function createApiActions<T>(
    key: String,
    opts: ApiCreateOpts<T>
  ): ApiActions<T>;

  export function createApiSelector(key: String, schema?: Schema): Selector;
  export function apiSelector(key: String, schema?: Schema): Selector;

  export function isApi(action: Action): Boolean;
  export function isSuccess(action: Action): Boolean;
  export function isFailure(action: Action): Boolean;
  export function isClear(action: Action): Boolean;
  export function isRefresh(action: Action): Boolean;

  export function successOf(key: String): String;
  export function failureOf(key: String): String;
  export function requestOf(key: String): String;
  export function clearOf(key: String): String;
  export function refreshOf(key: String): String;
}
