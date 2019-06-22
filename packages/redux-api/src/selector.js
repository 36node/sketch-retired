import { get } from "lodash";
import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import { initState } from "./reducer";
import { camelCaseKey } from "./lib";

const entitiesSelector = state => state.entities;

export const makeStateSelector = path => state =>
  get(state.apis, path) || initState;

/**
 *
 * @param {string} key api key or redux state key
 * @param {object} schema output data schema
 * @returns {function(object) => object} selector
 */
const makeApiSelector = (key, schema) => {
  const path = camelCaseKey(key);
  const stateSelector = makeStateSelector(path);

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

export default makeApiSelector;
