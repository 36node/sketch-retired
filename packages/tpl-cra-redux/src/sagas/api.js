import { normalize } from "normalizr";
import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeLatest,
} from "redux-saga/effects";
import { message } from "antd";

import { humps } from "../lib";
import history from "../history";
import Github from "../sdk/github";
import Petstore from "@36node/template-sdk";
import { repoSchema, petSchema } from "../selectors/schemas";
import { selectSession, selectRedirect } from "../selectors";
import { STORE_BASE, TOKEN } from "../config";
import * as cs from "../constants";

const github = new Github();
const petstore = new Petstore({
  base: STORE_BASE,
});

// fake api
const createSession = () => Promise.resolve({ body: { token: TOKEN } });
const deleteSession = () => Promise.resolve({});

/**
 * Saga helper for calling api
 *
 * @param {Function} api 具体方法
 * @param {Object?} schema 可能没有
 * @param {object} action action { type, payload, meta, next, error }
 */
function* callAPI(api, schema, action) {
  // schema 可能没有，收到 takeLatest 的限制，action 只能是最后一个参数
  if (!action) {
    action = schema;
    schema = null;
  }

  const { type, payload, meta } = action;
  try {
    const { body = {}, headers = {} } = yield call(api, payload);
    const data = schema ? normalize(body, schema) : { result: body };

    yield put({
      type: type.success(),
      payload: { ...data, ...humps(headers) },
      meta,
    });
  } catch (err) {
    yield put({
      type: type.failure(),
      payload: err,
      meta,
    });

    if (err.code === 401) {
      yield call(history.push, "/login");
      message.error("会话过期");
    } else {
      const msg = err.message || "api 请求错误";
      message.error(msg);
      throw err;
    }
  }
}

function* watchAPI(type, api, schema) {
  yield takeLatest(type, callAPI, api, schema);
}

function* watchSession() {
  while (true) {
    const session = yield select(selectSession);
    petstore.token = session.token;

    if (session.token) {
      // 登出流程
      yield take(cs.LOGOUT.success());
      yield call(history.push, "/login");
    } else {
      // 登录流程
      yield take(cs.LOGIN.success());
      const redirect = yield select(selectRedirect);
      yield call(history.push, redirect || "/");
    }
  }
}

export default function* root() {
  yield all([
    fork(watchSession),
    watchAPI(cs.LIST_REPOS, github.repo.listRepos, [repoSchema]),
    watchAPI(cs.GET_PET, petstore.pet.showPetById, petSchema),
    watchAPI(cs.LIST_PETS, petstore.pet.listPets, [petSchema]),
    watchAPI(cs.CREATE_PET, petstore.pet.createPets, petSchema),
    watchAPI(cs.LOGIN, createSession),
    watchAPI(cs.LOGOUT, deleteSession),
  ]);
}
