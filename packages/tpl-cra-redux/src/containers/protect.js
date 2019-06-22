import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";

import { globalSelectors } from "../selectors";

function hasSession(state = {}) {
  const result = state.result || {};
  if (result.id && result.token) return true;
  return false;
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!hasSession(rest.session)) {
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

export default connect(state => ({ session: globalSelectors.session(state) }))(
  ProtectedRoute
);
