import { call, cancel, fork, take, put } from "redux-saga/effects";
import { normalize } from "normalizr";

import { isRequest } from "./action";
import { schemaMap } from "./selector";
import { humps } from "../lib";

function* callAPI(action = {}) {
  const { key, type, payload, meta = {} } = action;
  const { types, endpoint, schema } = meta;

  if (!types || !types.SUCCESS || !types.FAILURE) {
    throw new Error(`api action ${type} missing success and failure.`);
  }

  if (!endpoint) {
    throw new Error(`api action ${type} should has endpoint.`);
  }

  if (schema) {
    schemaMap.set(key, schema);
  }

  try {
    const result = (yield call(endpoint, payload)) || {};
    const { body = {}, headers = {} } = result;
    const data = schema ? normalize(body, schema) : { result: body };
    yield put({
      type: types.SUCCESS,
      payload: { ...data, ...humps(headers) },
      key,
      meta,
    });
  } catch (err) {
    yield put({
      type: types.FAILURE,
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
    const { type, key, meta = {} } = action;
    const entry = type + key;
    if (!meta.parallel && tasks[entry]) yield cancel(tasks[entry]); //cancel last task of same key
    tasks[entry] = yield fork(callAPI, action);
  }
}
