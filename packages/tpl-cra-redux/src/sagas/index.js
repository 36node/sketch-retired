import { fork, all } from "redux-saga/effects";
import { watchApi } from "@36node/redux-api";
import watchSession from "./session";
import { watchXlsx } from "@36node/redux-xlsx";
import { watchCron } from "@36node/redux-cron";

export default function* root() {
  yield all([
    fork(watchApi),
    fork(watchSession),
    fork(watchXlsx),
    fork(watchCron),
  ]);
}
