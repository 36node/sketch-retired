import { isAction, makeAction } from "../lib";

const PREFIX = "@@api";
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

/**
 * make api action types
 */
export const makeApiTypes = base => ({
  REQUEST: `${PREFIX}/${base}_${REQUEST}`,
  SUCCESS: `${PREFIX}/${base}_${SUCCESS}`,
  FAILURE: `${PREFIX}/${base}_${FAILURE}`,
});

export const RESET = `${PREFIX}/RESET`;

export const isApi = isAction(new RegExp(`^${PREFIX}/.*$`));
export const isRequest = isAction(new RegExp(`^${PREFIX}/(.*)_${REQUEST}$`));
export const isSuccess = isAction(new RegExp(`^${PREFIX}/(.*)_${SUCCESS}$`));
export const isFailure = isAction(new RegExp(`^${PREFIX}/(.*)_${FAILURE}$`));

/**
 * Create Api maker
 */
export const createApiMaker = (types, endpoint, schema) => (
  key,
  initPayload,
  initMeta = {}
) => {
  if (!types || !types.REQUEST || !types.SUCCESS || !types.FAILURE) {
    throw new Error("Api action needs types: request,success,failure.");
  }

  if (!endpoint) {
    throw new Error("Api action need an endpoint.");
  }

  return makeAction(types.REQUEST, key, initPayload, {
    ...initMeta,
    types,
    endpoint,
    schema,
  });
};

/**
 * General actions
 */
export const makeApiReset = key => makeAction(RESET, key);
