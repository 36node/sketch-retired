import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";

import { selectSession } from "../selectors";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!rest.session.token) {
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

export default connect(state => ({ session: selectSession(state) }))(
  ProtectedRoute
);
