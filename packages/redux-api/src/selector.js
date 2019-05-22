import { get } from "lodash";
import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import { initState } from "./reducer";
import { Apis } from "./saga";
import { camelCaseKey } from "./lib";

const entitiesSelector = state => state.entities;

export const makeStateSelector = path => state =>
  get(state.apis, path) || initState;

/**
 *
 * @param {string} key api key
 * @returns {function(object) => object} selector
 */
const makeApiSelector = (key, reduxPath) => {
  const path = reduxPath || camelCaseKey(key);
  const stateSelector = makeStateSelector(path);

  return createSelector(
    stateSelector,
    entitiesSelector,
    (state, entities) => {
      const api = Apis.get(key);
      if (!api) return {};
      const schema = api.schema;

      const { result } = state;
      if (!result || !schema) return state;
      const deResult = denormalize(result, schema, entities);
      return { ...state, result: deResult };
    }
  );
};

export default makeApiSelector;
