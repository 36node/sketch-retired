import { fork, all } from "redux-saga/effects";

import apiSaga from "./api";

export default function* root() {
  yield all([fork(apiSaga)]);
}
