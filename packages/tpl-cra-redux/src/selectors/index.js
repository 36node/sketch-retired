import { createApiSelector } from "@36node/redux-api";
import {
  createToggleSelector,
  createAssignSelector,
  createProgressSelector,
} from "@36node/redux-ui";

import { NS } from "../constants";
import { petSchema, repoSchema } from "../schemas";
import { createCronSelector } from "@36node/redux-cron";

export const reduxXlsxSelectors = {
  listPets: createApiSelector(NS.REDUX_XLSX.PETS_XLSX, [petSchema]),
};

export const reduxUiSelectors = {
  toggleExample: createToggleSelector(NS.REDUX_UI.TOGGLE_EXP),
  assignExample: createAssignSelector(NS.REDUX_UI.ASSIGN_EXP),
  progressExample: createProgressSelector(NS.REDUX_UI.PROGRESS_EXP),
};

export const petStoreSelectors = {
  listPets: createApiSelector(NS.PET_STORE.LIST_PETS, [petSchema]),
  autoPager: createCronSelector(NS.PET_STORE.PAGE_CRON),
};

export const githubSelectors = {
  listRepos: createApiSelector(NS.GITHUB.LIST_REPOS, [repoSchema]),
};

export const globalSelectors = {
  session: createApiSelector("session"),
};
