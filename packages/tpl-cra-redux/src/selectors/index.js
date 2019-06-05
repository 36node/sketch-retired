import * as cs from "../constants";
import { apiSelector } from "@36node/redux-api";
import { createSelector } from "reselect";

export const petStoreSelectors = {
  listPets: apiSelector(cs.NS.PET_STORE.LIST_PETS),
};

export const githubSelectors = {
  listRepos: apiSelector(cs.NS.GITHUB.LIST_REPOS),
};

export const globalSelectors = {
  session: createSelector(
    apiSelector(cs.NS.GLOBAL.LOGIN),
    state => {
      return state.result || {};
    }
  ),
};
