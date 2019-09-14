import { fork, all } from "redux-saga/effects";
import { watchApi, watchCron, watchHelper } from "@36node/redux";
import { watchXlsx } from "@36node/redux-xlsx";

import watchSession from "./session";

export default function* root() {
  yield all([
    fork(watchHelper),
    fork(watchApi),
    fork(watchCron),
    fork(watchSession),
    fork(watchXlsx),
  ]);
}
