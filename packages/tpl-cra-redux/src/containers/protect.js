import React from "react";
import { Route, Redirect } from "react-router";

import { TOKEN } from "../constants";

function isAuth() {
  return !!sessionStorage.getItem(TOKEN);
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!isAuth()) {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }

      return <Component {...props} />;
    }}
  />
);

export default ProtectedRoute;
