import { fork, all } from "redux-saga/effects";
import { watchApis } from "@36node/redux-api";
import watchSession from "./session";
import { watchXlsx } from "@36node/redux-xlsx";

export default function* root() {
  yield all([fork(watchApis), fork(watchSession), fork(watchXlsx)]);
}
