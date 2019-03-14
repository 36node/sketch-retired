import { call, cancel, fork, take, put } from "redux-saga/effects";
import { normalize } from "normalizr";

import { isRequest, successOf, failureOf } from "./actions";
import { getEndpoint, getSchema } from "./factory";

/**
 * Saga helper for calling api
 *
 * @param {object} action action { type, payload, meta, next, error }
 */
function* callAPI(action) {
  // schema 可能没有，收到 takeLatest 的限制，action 只能是最后一个参数
  if (!action) {
    throw new Error("[redux-api]: action is required for callAPI");
  }

  const { type, payload, meta } = action;
  const { key } = meta;
  const endpoint = getEndpoint(key);
  const schema = getSchema(key);

  if (!endpoint) {
    throw new Error("[redux-api]: plz register key before use it");
  }

  try {
    const { body = {}, headers = {} } = yield call(endpoint, payload);
    const data = schema ? normalize(body, schema) : { result: body };

    yield put({
      type: successOf(type),
      payload: { ...data, ...headers },
      meta: { ...meta, schema },
    });
  } catch (err) {
    yield put({
      type: failureOf(type),
      payload: err,
      meta,
    });
  }
}

/**
 * watch api
 *
 * 监听符合 pattern _REQUEST 模式的 actions，并发起对应的 api call
 */
export default function* rootSaga() {
  const tasks = {};
  while (true) {
    const action = yield take(isRequest);
    const { meta = {} } = action;
    const { key } = meta;
    if (tasks[key]) yield cancel(tasks[key]); // 如果任务已经结束，则 cancel 为空操作
    tasks[key] = yield fork(callAPI, action);
  }
}
