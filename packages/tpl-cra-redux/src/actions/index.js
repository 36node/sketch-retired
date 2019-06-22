/// <reference path='../sdk/.github.d.ts' />

import { NS } from "../constants";

import { createApiActions } from "@36node/redux-api";
import { petSchema, repoSchema } from "../schemas";
import { github, petstore, auth } from "../sdk";
import { createToggleActions } from "@36node/redux-ui/toggle";
import { createAssignActions } from "@36node/redux-ui/assign";
import { createProgressActions } from "@36node/redux-ui/progress";

export { default as reduxXlsxActions } from "./pets-xlsx";

export const reduxUiActions = {
  toggleExample: createToggleActions(NS.REDUX_UI.TOGGLE_EXP),
  assignExample: createAssignActions(NS.REDUX_UI.ASSIGN_EXP),
  progressExample: createProgressActions(NS.REDUX_UI.PROGRESS_EXP),
};

export const githubActions = {
  listRepos: createApiActions(NS.GITHUB.LIST_REPOS, {
    endpoint: github.repo.listRepos,
    schema: [repoSchema],
  }),
};

/**
 * pet store actions
 */
export const petStoreActions = {
  listPets: createApiActions(NS.PET_STORE.LIST_PETS, {
    endpoint: petstore.pet.listPets,
    schema: [petSchema],
  }),
  createPet: createApiActions(NS.PET_STORE.CREATE_PET, {
    endpoint: petstore.pet.createPet,
    schema: petSchema,
  }),
  getPet: createApiActions(NS.PET_STORE.GET_PET, {
    endpoint: petstore.pet.showPetById,
    schema: petSchema,
  }),
};

export const globalActions = {
  refreshSession: createApiActions(NS.GLOBAL.REFRESH, {
    endpoint: auth.session.getSession,
    reduxPath: "session",
  }),
  login: createApiActions(NS.GLOBAL.LOGIN, {
    endpoint: auth.session.createSession,
    reduxPath: "session",
  }),
  logout: createApiActions(NS.GLOBAL.LOGOUT, {
    endpoint: auth.session.deleteSession,
    reduxPath: "session",
  }),
  unauth: createApiActions(NS.GLOBAL.UNAUTH, {
    endpoint: auth.session.unauth,
  }),
};
