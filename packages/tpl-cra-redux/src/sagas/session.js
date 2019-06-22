import { successOf, isFailure } from "@36node/redux-api";
import { call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { message } from "antd";

import { history } from "../lib";
import { petstore } from "../sdk";
import { NS } from "../constants";
import { globalActions } from "../actions";

const SESSION_ID = "session_id";
const LOGIN_URL = "/login";
const reloginRequest = globalActions.refreshSession.request;

function* login({ payload = {}, meta = {} }) {
  const { result = {} } = payload;

  if (!result.id) {
    throw new Error("missing session id");
  }
  if (!result.token) {
    throw new Error("missing session token");
  }

  // session id is a refresh token for jwt
  // store in localstorage
  localStorage.setItem(SESSION_ID, result.id);
  petstore.token = result.token;

  // go back where we from
  const { from = { pathname: "/" } } = meta;
  if (history.location.pathname === LOGIN_URL) {
    yield call(history.push, from);
  }
}

function* logout() {
  localStorage.removeItem(SESSION_ID);
  petstore.token = undefined;

  yield call(history.push, LOGIN_URL);
}

function* reLogin(from) {
  while (true) {
    const sessionId = localStorage.getItem(SESSION_ID);
    if (sessionId) {
      yield put(reloginRequest({ sessionId }, { from }));
    }
    yield delay(10 * 6 * 1000);
  }
}

function* flashError({ error }) {
  message.error(error.msg || "API Request Error");
  if (error.status === 401) {
    yield logout();
  }
}

export default function* watchSession() {
  const from = history.location || "/";
  // refresh jwt token
  yield fork(reLogin, from);
  yield takeLatest(successOf(NS.GLOBAL.LOGIN), login);
  yield takeLatest(successOf(NS.GLOBAL.REFRESH), login);
  yield takeLatest(successOf(NS.GLOBAL.LOGOUT), logout);
  yield takeLatest(isFailure, flashError);
}
