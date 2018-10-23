import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Router, Route, Switch } from "react-router-dom";

import history from "./history";
import ProtectedRoute from "./containers/protect";

import Home from "./containers/home";
import PetStore from "./containers/pet-store";
import Github from "./containers/github";
import Login from "./containers/login";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/pet-store" component={PetStore} />
          <Route path="/github" component={Github} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);
