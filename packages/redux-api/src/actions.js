/// <reference path='../typings/index.d.ts' />
import { endsWith, startsWith } from "lodash";

export const PREFIX = "@API";
export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const CLEAR = "CLEAR";
export const REFRESH = "REFRESH";

/**
 * make api action types
 * @param {string} base base name
 */
export const makeTypes = key => ({
  request: `${PREFIX}/${key}_${REQUEST}`,
  success: `${PREFIX}/${key}_${SUCCESS}`,
  failure: `${PREFIX}/${key}_${FAILURE}`,
  clear: `${PREFIX}/${key}_${CLEAR}`,
  refresh: `${PREFIX}/${key}_${REFRESH}`,
});

export const successOf = key => `${PREFIX}/${key}_${SUCCESS}`;
export const requestOf = key => `${PREFIX}/${key}_${REQUEST}`;
export const failureOf = key => `${PREFIX}/${key}_${FAILURE}`;
export const clearOf = key => `${PREFIX}/${key}_${CLEAR}`;
export const refreshOf = key => `${PREFIX}/${key}_${REFRESH}`;

/**
 * action is api action
 * @param {import("@36node/redux-api").Action} action action
 */
export function isApi(action) {
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
 * Is clear action
 * @param {import("@36node/redux-api").Action} action action
 */
export function isClear(action) {
  return isApi(action) && endsWith(action.type, CLEAR);
}

/**
 * Is refresh action
 * @param {import("@36node/redux-api").Action} action action
 */
export function isRefresh(action) {
  return isApi(action) && endsWith(action.type, REFRESH);
}
