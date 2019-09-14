import { call, delay, put, takeLatest } from "redux-saga/effects";
import { message } from "antd";
import { isFailure } from "@36node/redux";

import { history } from "../lib";
import { auth } from "../actions/api";
import { LOGIN, REFRESH, LOGOUT } from "../actions/types";

const SESSION_ID = "session_id";
const TOKEN = "token";
const LOGIN_URL = "/login";
const REFRESh_TOKEN_DELAY = 30 * 60 * 1000;

export default function* watchSession() {
  const refresh = auth.makeRefresh("session");

  function* login({ payload = {}, meta = {} }) {
    const { result = {} } = payload;
    if (!result.id) {
      throw new Error("missing session id");
    }
    if (!result.token) {
      throw new Error("missing session token");
    }

    /** session id is a refresh token for jwt */
    localStorage.setItem(SESSION_ID, result.id);
    sessionStorage.setItem(TOKEN, result.token);

    /** go back where we from */
    if (meta.from) {
      yield call(history.push, meta.from);
    }

    /** refresh token after 10 minutes */
    yield delay(REFRESh_TOKEN_DELAY);
    yield put(refresh({ sessionId: result.id }));
  }

  function* logout() {
    localStorage.removeItem(SESSION_ID);
    sessionStorage.removeItem(TOKEN);
    yield call(history.push, LOGIN_URL, { from: history.location });
  }

  function* flashError({ error, type }) {
    message.error(error.msg || "Authentication Failed");
    if (error.status === 401) {
      yield logout();
    }
  }

  /** refresh session at first time open app, maybe redirect by protected router, set from */
  const sessionId = localStorage.getItem(SESSION_ID);
  if (sessionId) {
    yield put(refresh({ sessionId }, { from: history.location }));
  }

  yield takeLatest([LOGIN.SUCCESS, REFRESH.SUCCESS], login);
  yield takeLatest(LOGOUT.SUCCESS, logout);
  yield takeLatest(isFailure, flashError);
}
