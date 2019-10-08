import { takeEvery, takeLatest } from "redux-saga/effects";
import { isAction } from "./action";

/**
 * tap on given type and key
 */
export function tapOn(type, key, saga) {
  return function* saga() {
    yield takeEvery(isAction(type, key), saga);
  };
}

export function tapOnLatest(type, key, saga) {
  return function* saga() {
    yield takeLatest(isAction(type, key), saga);
  };
}
