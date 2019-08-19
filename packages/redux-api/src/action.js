/// <reference path='../typings/index.d.ts' />

import { endsWith, startsWith } from "lodash";

import { camelCaseKey } from "./lib";
import map from "./map";

const PREFIX = "@api/";
const REQUEST = "/REQUEST";
const SUCCESS = "/SUCCESS";
const FAILURE = "/FAILURE";

export const requestOf = base => `${PREFIX}${base}${REQUEST}`;
export const successOf = base => `${PREFIX}${base}${SUCCESS}`;
export const failureOf = base => `${PREFIX}${base}${FAILURE}`;

export function baseOf(type) {
  const pattern = new RegExp(`${PREFIX}(.*)(${REQUEST}|${SUCCESS}|${FAILURE})`);
  const arr = type.match(pattern);
  if (arr && arr.length > 1) return arr[1];
  return type;
}

/**
 * action is api action
 * @param {import("@36node/redux-api").Action} action action
 */
export function isApi(action = {}) {
  const { key, type } = action;
  return key && startsWith(type, PREFIX);
}

/**
 * Is request action
 * @param {import("@36node/redux-api").Action} action action
 */
export function isRequest(action) {
  return isApi(action) && endsWith(action.type, REQUEST);
}

/**
 * Is success action
 * @param {import("@36node/redux-api").Action} action action
 */
export function isSuccess(action) {
  return isApi(action) && endsWith(action.type, SUCCESS);
}

/**
 * Is failure action
 * @param {import("@36node/redux-api").Action} action action
 */
export function isFailure(action) {
  return isApi(action) && endsWith(action.type, FAILURE);
}

/**
 * Create Api Action
 *
 * @type {import("@36node/redux-api").createApiAction}
 */
export function createApiAction(base, endpoint, options = {}) {
  if (!base) {
    throw new Error("Api action need a base type!");
  }

  if (!endpoint) {
    throw new Error("Api action need an endpoint function");
  }

  const type = requestOf(base);
  map.set(type, { base, endpoint, schema: options.schema });

  return (payload = {}, meta = {}) => {
    let key = options.key || base;
    if (typeof key === "function") key = key(payload);

    return {
      type,
      key: camelCaseKey(key),
      payload: { ...options.payload, ...payload },
      meta: { ...options.meta, ...meta },
    };
  };
}
