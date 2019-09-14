import { cancel, fork, put, take } from "redux-saga/effects";

const Sagas = new Map();
const Cache = new Map();

/**
 * tap on given type and key
 */
export function tapOn(type, key, saga) {
  if (!type) {
    throw new Error("type is required for tap");
  }
  if (!saga) {
    saga = key;
    key = "default";
  }

  Sagas.set(type + key, saga);
}

/**
 * put some action again with last params
 */
export function* rePut(action) {
  const { type, key } = action;
  const cached = Cache.get(type + key);
  if (cached) {
    yield put({ ...action, ...cached });
  }
}

/**
 * watch tap saga helper
 */
export function* watchHelper() {
  const tasks = {};
  while (true) {
    const action = yield take("*");
    const { key, type, meta = {} } = action;
    const entry = type + key;

    /** watch reput */
    if (meta.rePut) Cache.set(entry, action);

    /** watch tap */
    const saga = Sagas.get(entry);
    if (!meta.parallel && tasks[entry]) yield cancel(tasks[entry]);
    if (saga) tasks[entry] = yield fork(saga, action);
  }
}
