import { requestOf, clearOf, refreshOf } from "./actions";
import { registerSaga } from "./saga";
import makeApiSelector from "./selector";
import { camelCaseKey } from "./lib";

export { default as apiReducers, apiReducer, entitiesReducer } from "./reducer";
export { watchApis, registerHooks } from "./saga";
export {
  isApi,
  isSuccess,
  isRequest,
  isFailure,
  successOf,
  failureOf,
  requestOf,
} from "./actions";

class Api {
  constructor(key, endpoint, schema, reduxPath) {
    this._key = key;
    this._endpoint = endpoint;
    this._schema = schema;

    // default redux path
    if (!reduxPath) {
      this._reduxPath = camelCaseKey(key);
    }
  }

  get endpoint() {
    return this._endpoint;
  }

  get key() {
    return this._key;
  }

  get schema() {
    return this._schema;
  }

  get reduxPath() {
    return this._reduxPath;
  }

  get actions() {
    return {
      request: (payload, meta = {}) => ({
        type: requestOf(this.key),
        key: this.key,
        payload,
        meta,
      }),

      clear: (meta = {}) => ({
        type: clearOf(this.key),
        key: this.key,
        meta,
      }),

      refresh: (meta = {}) => ({
        type: refreshOf(this.key),
        key: this.key,
        meta,
      }),
    };
  }
}

export function createApiActions(key, opts = {}) {
  if (!key) {
    throw new Error("Api need a key!");
  }

  if (!opts.endpoint) {
    throw new Error("Api need an endpoint function");
  }

  const api = new Api(key, opts.endpoint, opts.schema, opts.reduxPath);
  registerSaga(key, api);
  return api.actions;
}

export function apiSelector(key, reduxPath) {
  return makeApiSelector(key, reduxPath);
}
