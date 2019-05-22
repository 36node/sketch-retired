/// <reference path='../typings/index.d.ts' />
import {
  call,
  cancel,
  fork,
  take,
  put,
  all,
  takeLatest,
  select,
} from "redux-saga/effects";
import { normalize } from "normalizr";
import { isRequest, isRefresh, isApi } from "./actions";
import { humps } from "./lib";
import { successOf, failureOf, requestOf } from "@36node/redux-api";
import { makeStateSelector } from "./selector";

export const Apis = new Map();

export function registerSaga(key, api) {
  Apis.set(key, api);
}

// hooks
const sagaHooks = {
  beforeRequest: null,
  afterRequest: null,
};

export function registerHooks(hooks = {}) {
  sagaHooks.beforeRequest = hooks.beforeRequest || null;
  sagaHooks.afterRequest = hooks.afterRequest || null;
}

/**
 *
 * @param {string} key
 * @param {import("@36node/redux-api").Action} action
 * @param {import("@36node/redux-api").Meta} meta
 */
export function* callAPI(key, action, meta) {
  if (!key) return;
  if (!action) return;

  const { payload } = action;
  const api = Apis.get(key);

  if (!api) {
    throw new Error(`redux-api: api ${key} should be registered`);
  }

  const endpoint = api.endpoint;
  if (!endpoint) {
    throw new Error(`redux-api: api ${key} should has endpoint`);
  }

  const schema = api.schema;

  if (sagaHooks.beforeRequest) {
    const passed = yield call(sagaHooks.beforeRequest, key, action, api);
    // if before request hook return false, will cancel current request
    if (!passed) {
      return;
    }
  }

  let epResult;
  let epError;
  try {
    epResult = (yield call(endpoint, payload)) || {};
    const { body = {}, headers = {} } = epResult;
    const data = schema ? normalize(body, schema) : { result: body };

    yield put({
      type: successOf(key),
      payload: { ...data, ...humps(headers) },
      key,
      meta,
    });
  } catch (err) {
    yield put({
      type: failureOf(key),
      payload: err,
      key,
      meta,
    });
    epError = err;
    console.error(err);
  }

  if (sagaHooks.afterRequest) {
    yield call(sagaHooks.afterRequest, key, action, api, epResult, epError);
  }
}

export function* watchRequest() {
  const tasks = {};
  while (true) {
    const action = yield take(isRequest);
    const { meta = {}, key } = action;
    if (tasks[key]) yield cancel(tasks[key]); //cancel last task of key
    tasks[key] = yield fork(callAPI, key, action, meta);
  }
}

export function* watchRefresh(action) {
  // const action = yield take(isRefresh);
  const { key } = action;
  const api = Apis.get(key);
  if (!api) {
    throw new Error(`redux-api: api ${key} should be registered`);
  }
  const stateSelector = makeStateSelector(api.reduxPath);
  const apiState = yield select(stateSelector);

  // put last request action
  yield put({
    type: requestOf(key),
    key,
    payload: apiState.request,
    meta: apiState.meta,
  });
  // while (true) {
  // }
}

export function* watchApis() {
  yield all([fork(watchRequest), takeLatest(isRefresh, watchRefresh)]);
}
