import * as cs from "../constants";
import { apiSelector } from "@36node/redux-api";
import { toggleSelector } from "@36node/redux-ui/toggle";
import { assignSelector } from "@36node/redux-ui/assign";
import { progressSelector } from "@36node/redux-ui/progress";
import { createSelector } from "reselect";

export const reduxUiSelectors = {
  toggleExample: toggleSelector(cs.NS.REDUX_UI.TOGGLE_EXP),
  assignExample: assignSelector(cs.NS.REDUX_UI.ASSIGN_EXP),
  progressExample: progressSelector(cs.NS.REDUX_UI.PROGRESS_EXP),
};

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
