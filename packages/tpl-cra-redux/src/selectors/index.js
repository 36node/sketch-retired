import { createApiSelector } from "@36node/redux-api";
import {
  createToggleSelector,
  createAssignSelector,
  createProgressSelector,
} from "@36node/redux-ui";

import { actionTypes, storeKeys } from "../constants";
import { petSchema, repoSchema } from "../schemas";
import { createCronSelector } from "@36node/redux-cron";

export const reduxXlsxSelectors = {
  listPets: createApiSelector(actionTypes.REDUX_XLSX.PETS_XLSX, [petSchema]),
};

export const reduxUiSelectors = {
  toggleExample: createToggleSelector(actionTypes.REDUX_UI.TOGGLE_EXP),
  assignExample: createAssignSelector(actionTypes.REDUX_UI.ASSIGN_EXP),
  progressExample: createProgressSelector(actionTypes.REDUX_UI.PROGRESS_EXP),
};

export const petStoreSelectors = {
  selectPets: createApiSelector(storeKeys.petStore.pets, [petSchema]),
  selectPager: createCronSelector(actionTypes.PET_STORE.PAGE_CRON),
};

export const githubSelectors = {
  selectRepos: createApiSelector(storeKeys.github.repos, [repoSchema]),
};

export const globalSelectors = {
  selectSession: createApiSelector(storeKeys.session),
};
