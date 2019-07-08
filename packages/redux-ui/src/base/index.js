import { camelCaseKey } from "../utils";

export class ReduxUiBase {
  constructor(key, reduxPath) {
    this._key = key;
    this._reduxPath = camelCaseKey(reduxPath || key);
  }

  get key() {
    return this._key;
  }

  get reduxPath() {
    return this._reduxPath;
  }
}
