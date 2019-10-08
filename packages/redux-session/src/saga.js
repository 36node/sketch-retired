import { call, delay, put, takeLatest } from "redux-saga/effects";
import { isFailure } from "@36node/redux";
import { message } from "antd";

import { history } from "./history";
import { SESSION_ID, TOKEN, LOGIN_URL, REFRESh_TOKEN_DELAY } from "./constants";

export function makeSessionWatcher({
  refresh,
  loginSuccessTypes = [],
  logoutSuccessTypes = [],
} = {}) {
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

  return function* watchSession() {
    /**
     * refresh session at first time open app,
     * maybe redirect by protected router, set from
     */
    const sessionId = localStorage.getItem(SESSION_ID);
    if (sessionId) {
      yield put(refresh({ sessionId }));
    }

    yield takeLatest(loginSuccessTypes, login);
    yield takeLatest(logoutSuccessTypes, logout);
    yield takeLatest(isFailure, flashError);
  };
}
