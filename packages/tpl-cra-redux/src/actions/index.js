/// <reference path='../sdk/.github.d.ts' />

import { createApiAction } from "@36node/redux-api";
import {
  createToggleActions,
  createAssignActions,
  createProgressActions,
} from "@36node/redux-ui";

import { actionTypes, storeKeys } from "../constants";
import { repoSchema } from "../schemas";
import { github, auth } from "../sdk";
import * as petStoreActions from "./pet-store";

export { default as reduxXlsxActions } from "./pets-xlsx";
export { petStoreActions };

export const reduxUiActions = {
  toggleExample: createToggleActions(actionTypes.REDUX_UI.TOGGLE_EXP),
  assignExample: createAssignActions(actionTypes.REDUX_UI.ASSIGN_EXP),
  progressExample: createProgressActions(actionTypes.REDUX_UI.PROGRESS_EXP),
};

export const githubActions = {
  listRepos: createApiAction(
    actionTypes.GITHUB.LIST_REPOS,
    github.repo.listRepos,
    {
      key: storeKeys.github.repos,
      schema: [repoSchema],
    }
  ),
};

export const globalActions = {
  reLogin: createApiAction(actionTypes.RELOGIN, auth.session.getSession, {
    key: storeKeys.session,
  }),
  login: createApiAction(actionTypes.LOGIN, auth.session.createSession, {
    key: storeKeys.session,
  }),
  logout: createApiAction(actionTypes.LOGOUT, auth.session.deleteSession, {
    key: storeKeys.session,
  }),
  unauth: createApiAction(actionTypes.UNAUTH, auth.session.unauth),
};
