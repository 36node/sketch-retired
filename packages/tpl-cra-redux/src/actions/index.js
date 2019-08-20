/// <reference path='../sdk/.github.d.ts' />

import { NS } from "../constants";

import { createApiActions } from "@36node/redux-api";
// template-example-start
import { repoSchema } from "../schemas";
// template-example-end
import { github, auth } from "../sdk";
import {
  createToggleActions,
  createAssignActions,
  createProgressActions,
} from "@36node/redux-ui";

// template-example-start
export { default as reduxXlsxActions } from "./pets-xlsx";

export { petStoreActions } from "./pet-store";

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
// template-example-end

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
