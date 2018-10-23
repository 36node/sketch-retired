import { take, put, call, fork, select, all, cancel } from "redux-saga/effects";
import { normalize } from "normalizr";

import Petstore from "../sdk/petstore";
import Github from "../sdk/github";
import { repoSchema } from "../sdk/github.schema";
import { petSchema } from "../sdk/petstore.schema";
import { selectSession, selectRedirect } from "../selectors";
import { STORE_BASE, TOKEN } from "../config";
import * as cs from "../constants";
import history from "../history";

const github = new Github();
const petstore = new Petstore({
  base: STORE_BASE,
});

// fake api
const createSession = () => Promise.resolve({ body: { token: TOKEN } });
const deleteSession = () => Promise.resolve({});

/**
 * api and schema map
 */

const API = {
  [cs.LIST_REPOS]: github.repo.listRepos,
  [cs.GET_PET]: petstore.pet.showPetById,
  [cs.LIST_PETS]: petstore.pet.listPets,
  [cs.CREATE_PET]: petstore.pet.createPets,
  [cs.LOGIN]: createSession,
  [cs.LOGOUT]: deleteSession,
};

const SCHEMA = {
  [github.repo.listRepos]: [repoSchema],
  [petstore.pet.showPetById]: [petSchema],
  [petstore.pet.listPets]: [petSchema],
  [petstore.pet.createPets]: [petSchema],
};

/**
 * Saga helper for calling api
 *
 * @param {object} action action { type, payload, meta, next, error }
 */
function* callAPI(api, { type, payload }, schema) {
  try {
    const { body = {}, header = {} } = yield call(api, payload);
    const data = normalize(body, schema || {});
    yield put({
      type: type.success(),
      payload: { ...data, ...header },
    });
  } catch (err) {
    yield put({
      type: type.failure(),
      payload: err,
    });

    // if err is 401 error
    // trigger logout workflow
  }
}

function* watchAPI() {
  let last = {};
  while (true) {
    const action = yield take(Object.keys(API));
    const api = API[action.type];
    const schema = SCHEMA[api];

    if (last[action.type]) yield cancel(last[action.type]);
    last[action.type] = yield fork(callAPI, api, action, schema);
  }
}

function* loginFlow() {
  while (true) {
    const session = yield select(selectSession);
    petstore.token = session.token;
    if (!session.token) {
      yield take(cs.LOGIN.success());
      const redirect = yield select(selectRedirect);
      yield call(history.push, redirect || "/");
    }
    yield take(cs.LOGOUT.success());
    yield call(history.push, "/login");
  }
}

export default function* root() {
  yield all([fork(loginFlow), fork(watchAPI)]);
}
