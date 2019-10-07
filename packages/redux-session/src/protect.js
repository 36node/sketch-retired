import React from "react";
import { Route, Redirect } from "react-router-dom";

import { TOKEN } from "./constants";

function isAuth() {
  return !!sessionStorage.getItem(TOKEN);
}

export const ProtectedRoute = ({ component: Component, redirect, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!isAuth()) {
        return (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: props.location },
            }}
          />
        );
      }

      return <Component {...props} />;
    }}
  />
);
