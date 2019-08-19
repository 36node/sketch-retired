import { successOf, isFailure } from "@36node/redux-api";
import { call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { message } from "antd";

import { history } from "../lib";
import { LOGIN_URL, actionTypes, SESSION_ID, TOKEN } from "../constants";
import { globalActions } from "../actions";

const reloginRequest = globalActions.reLogin;

function* login({ payload = {}, meta = {} }) {
  const { result = {} } = payload;
  if (!result.id) {
    throw new Error("missing session id");
  }
  if (!result.token) {
    throw new Error("missing session token");
  }

  // session id is a refresh token for jwt
  // store in localstorage and session storage
  localStorage.setItem(SESSION_ID, result.id);
  sessionStorage.setItem(TOKEN, result.token);

  // go back where we from
  const { from = { pathname: "/" } } = meta;

  if (history.location.pathname === LOGIN_URL) {
    yield call(history.push, from);
  }
}

function* logout() {
  localStorage.removeItem(SESSION_ID);
  sessionStorage.removeItem(TOKEN);
  yield call(history.push, LOGIN_URL);
}

function* reLogin(from) {
  while (true) {
    const sessionId = localStorage.getItem(SESSION_ID);
    if (sessionId && history.location.pathname !== LOGIN_URL) {
      yield put(reloginRequest({ sessionId }, { from }));
    }
    yield delay(10 * 60 * 1000);
  }
}

function* flashError({ error, type }) {
  message.error(error.msg || "API Request Error");
  if (error.status === 401) {
    yield logout();
  }
}

export default function* watchSession() {
  const from = history.location || "/";
  // refresh jwt token
  yield fork(reLogin, from);
  yield takeLatest(successOf(actionTypes.LOGIN), login);
  yield takeLatest(successOf(actionTypes.RELOGIN), login);
  yield takeLatest(successOf(actionTypes.LOGOUT), logout);
  yield takeLatest(isFailure, flashError);
}
