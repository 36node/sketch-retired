/// <reference path='../typings/index.d.ts' />

import { call, cancel, fork, take, put } from "redux-saga/effects";
import { normalize } from "normalizr";

import { isRequest, successOf, failureOf } from "./action";
import { humps } from "./lib";
import map from "./map";

/**
 *
 * @param {string} key
 * @param {import("@36node/redux-api").Action} action
 * @param {import("@36node/redux-api").Meta} meta
 */
function* callAPI(action = {}) {
  const { key, type, payload, meta } = action;
  const { endpoint, schema, base } = map.get(type);

  if (!endpoint) {
    throw new Error(`redux-api: action ${type} should has endpoint`);
  }

  let epResult;
  try {
    epResult = (yield call(endpoint, payload)) || {};
    const { body = {}, headers = {} } = epResult;
    const data = schema ? normalize(body, schema) : { result: body };

    yield put({
      type: successOf(base),
      payload: { ...data, ...humps(headers) },
      key,
      meta,
    });
  } catch (err) {
    yield put({
      type: failureOf(base),
      error: err,
      key,
      meta,
    });
  }
}

export function* watchApi() {
  const tasks = {};
  while (true) {
    const action = yield take(isRequest);
    const { key } = action;
    if (key && tasks[key]) yield cancel(tasks[key]); //cancel last task of key
    tasks[key] = yield fork(callAPI, action);
  }
}
