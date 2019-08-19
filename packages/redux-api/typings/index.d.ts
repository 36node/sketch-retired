import { Schema } from "normalizr";
import { Saga } from "redux-saga";
import { Reducer } from "redux";

declare module "@36node/redux-api" {
  /**
   * endpoint result
   * 20x or 30x result
   */
  interface EpResult {
    body?: object | string;
    headers?: object;
  }

  interface Meta {
    append?: boolean;
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
  interface Action {
    type: string;
    payload?: object;
    key: string;
    meta: Meta;
    error: Error;
  }

  interface CreateApiActionOpts {
    key?: string | KeyFunction;
    schema?: Schema;
    meta: Meta;
  }

  interface ApiState {
    request: object;
    result: object | [object];
    total: number;
    loading: boolean;
    meta: object;
  }

  type Selector = (state: object) => ApiState;
  type Endpoint<T> = (payload: T) => Promise<EpResult>;
  type ApiAction<T> = (payload: T, meta: Meta) => Action;

  interface ApiReducers {
    api: Reducer<ApiState, Action>;
    entities: Reducer<ApiState, Action>;
  }

  /**
   * action
   */
  export function isApi(action: Action): boolean;
  export function isRequest(action: Action): boolean;
  export function isSuccess(action: Action): boolean;
  export function isFailure(action: Action): boolean;
  export function requestOf(type: string): boolean;
  export function successOf(type: string): boolean;
  export function failureOf(type: string): boolean;

  export function createApiAction<T>(
    base: string,
    endpoint: Endpoint<T>,
    options: CreateApiActionOpts
  ): ApiAction<T>;

  /**
   * reducer
   */
  export const apiReducers: ApiReducers;

  /**
   * selector
   * @param key state key in store
   * @param schema schema of state.result
   */
  export function createApiSelector(key: string, schema?: Schema): Selector;

  /**
   * saga
   */
  export const watchApi: Saga;
}
