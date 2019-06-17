/// <reference path='../sdk/.github.d.ts' />

import * as cs from "../constants";

import { createApiActions } from "@36node/redux-api";
import { petSchema, repoSchema } from "../selectors/schemas";
import { github, petstore, auth } from "../sdk";
import { createToggleActions } from "@36node/redux-ui/toggle";
import { createAssignActions } from "@36node/redux-ui/assign";
import { createProgressActions } from "@36node/redux-ui/progress";

export const reduxUiActions = {
  toggleExample: createToggleActions(cs.NS.REDUX_UI.TOGGLE_EXP),
  assignExample: createAssignActions(cs.NS.REDUX_UI.ASSIGN_EXP),
  progressExample: createProgressActions(cs.NS.REDUX_UI.PROGRESS_EXP),
};

export const githubActions = {
  listRepos: createApiActions(cs.NS.GITHUB.LIST_REPOS, {
    endpoint: github.repo.listRepos,
    schema: [repoSchema],
  }),
};

/**
 * pet store actions
 */
export const petStoreActions = {
  listPets: createApiActions(cs.NS.PET_STORE.LIST_PETS, {
    endpoint: petstore.pet.listPets,
    schema: [petSchema],
  }),
  createPets: createApiActions(cs.NS.PET_STORE.CREATE_PET, {
    endpoint: petstore.pet.createPet,
    schema: petSchema,
  }),
  getPet: createApiActions(cs.NS.PET_STORE.GET_PET, {
    endpoint: petstore.pet.showPetById,
    schema: petSchema,
  }),
};

export const globalActions = {
  login: createApiActions(cs.NS.GLOBAL.LOGIN, {
    endpoint: auth.session.createSession,
  }),
  logout: createApiActions(cs.NS.GLOBAL.LOGOUT, {
    endpoint: auth.session.deleteSession,
  }),
};
