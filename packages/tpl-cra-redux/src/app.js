import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { Router, Route, Switch } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";

import history from "./history";
import ProtectedRoute from "./containers/protect";

import Home from "./containers/home";
import PetStore from "./containers/pet-store";
import Github from "./containers/github";
import Login from "./containers/login";
import Nav from "./containers/nav";
import Logo from "./components/logo";
import { Content, Footer, Header } from "./components/layout";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute component={Main} />
        </Switch>
      </Router>
    );
  }
}

const Main = () => (
  <Layout>
    <Header>
      <Logo />
      <Nav />
    </Header>
    <Content>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>PetStore</Breadcrumb.Item>
        <Breadcrumb.Item>Github</Breadcrumb.Item>
      </Breadcrumb>
      <Route path="/" exact component={Home} />
      <Route path="/github" component={Github} />
      <Route path="/pet-store" component={PetStore} />
    </Content>
    <Footer>Template-CRA-Redux ©2019 Created by 36node</Footer>
  </Layout>
);

export default (process.env.NODE_ENV === "development" ? hot(App) : App);
