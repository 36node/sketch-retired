import { get } from "lodash";
import { createSelector } from "reselect";
import { denormalize } from "normalizr";

import { initState } from "./reducer";
import { camelCaseKey } from "./lib";

const entitiesSelector = state => state.entities;

export const createStateSelector = path => state =>
  get(state.api, path) || initState;

/**
 *
 * @param {string} key store key
 * @returns {function(object) => object} selector
 */
export const createApiSelector = (key, schema) => {
  const path = camelCaseKey(key);
  const stateSelector = createStateSelector(path);

  return createSelector(
    stateSelector,
    entitiesSelector,
    (state, entities) => {
      const { result } = state;
      if (!result || !schema) return state;
      const deResult = denormalize(result, schema, entities);
      return { ...state, result: deResult };
    }
  );
};
