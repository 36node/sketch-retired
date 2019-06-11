import { camelCaseKey } from "../lib";

export class ReduxUiBase {
  constructor(key, reduxPath) {
    this._key = key;
    if (!reduxPath) {
      this._reduxPath = camelCaseKey(key);
    }
  }

  get key() {
    return this._key;
  }

  get reduxPath() {
    return this._reduxPath;
  }
}
