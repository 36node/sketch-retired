import * as cs from "../constants";
import { successOf } from "@36node/redux-api";
import history from "../history";
import { call, select, take } from "redux-saga/effects";
import { globalSelectors } from "../selectors";
import { petstore } from "../sdk";

const isSessionAction = action => {
  const { type } = action;

  return (
    type === successOf(cs.NS.GLOBAL.LOGIN) ||
    type === successOf(cs.NS.GLOBAL.LOGOUT)
  );
};

export default function* watchSession() {
  while (true) {
    const action = yield take(isSessionAction);

    // login
    if (action.type === successOf(cs.NS.GLOBAL.LOGIN)) {
      const session = yield select(globalSelectors.session) || {};
      petstore.token = session.token;
      yield call(history.push, "/");
    } else {
      // logout
      yield call(history.push, "/login");
    }
  }
}
