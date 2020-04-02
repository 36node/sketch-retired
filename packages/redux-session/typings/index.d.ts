import { Saga } from "redux-saga";
import { Action } from "@36node/redux";
import { Component } from "react";

declare module "@36node/redux-session" {
  interface makeSessionWatherOptions {
    getSession: Action<any>;
    loginSuccessTypes: [string];
    logoutSuccessTypes: [string];
  }
  type HOC = (component: Component) => Component;
  export function makeSessionWatcher(options: makeSessionWatherOptions): Saga;
  export function withSession(key: string): HOC;
  export const history: History;
  export const ProtectedRoute: Component;
  export function getToken(): String;
}
