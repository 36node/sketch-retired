import { apiSelector } from "@36node/redux-api";
import { createToggleSelector } from "@36node/redux-ui/toggle";
import { createAssignSelector } from "@36node/redux-ui/assign";
import { createProgressSelector } from "@36node/redux-ui/progress";

import { NS } from "../constants";
import { petSchema, repoSchema } from "../schemas";

export const reduxXlsxSelectors = {
  listPets: apiSelector(NS.REDUX_XLSX.PETS_XLSX),
};

export const reduxUiSelectors = {
  toggleExample: createToggleSelector(NS.REDUX_UI.TOGGLE_EXP),
  assignExample: createAssignSelector(NS.REDUX_UI.ASSIGN_EXP),
  progressExample: createProgressSelector(NS.REDUX_UI.PROGRESS_EXP),
};

export const petStoreSelectors = {
  listPets: apiSelector(NS.PET_STORE.LIST_PETS, [petSchema]),
};

export const githubSelectors = {
  listRepos: apiSelector(NS.GITHUB.LIST_REPOS, [repoSchema]),
};

export const globalSelectors = {
  session: apiSelector("session"),
};
