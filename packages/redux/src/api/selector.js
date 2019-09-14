import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import memoize from "fast-memoize";

import { makeSelector } from "../lib";
import { initState } from "./reducer";

export const schemaMap = new Map();

const entitiesSelector = state => state.entities;

/**
 * make api selector creator
 */
const _makeApiSelector = (key, { schema, selector, init = initState } = {}) => {
  const stateSelector = selector || makeSelector(`api.${key}`, init);

  return createSelector(
    stateSelector,
    entitiesSelector,
    (state = init, entities) => {
      const { result } = state;
      const outSchema = schema || schemaMap.get(key);
      if (!result || !outSchema) return state;
      const deResult = denormalize(result, outSchema, entities);
      return { ...state, result: deResult };
    }
  );
};

/**
 * use memoize to make sure return same function with same key
 */
export const makeApiSelector = memoize(_makeApiSelector);
// export const makeApiSelector = _makeApiSelector;
