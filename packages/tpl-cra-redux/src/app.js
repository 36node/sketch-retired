import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { Router, Route, Switch } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import Loadable from "react-loadable";

import history from "./history";
import ProtectedRoute from "./containers/protect";

import Nav from "./containers/nav";
import Logo from "./components/logo";
import { Content, Footer, Header } from "./components/layout";

const Home = Loadable({
  loader: () => import("./containers/home"),
  loading: null,
});
const PetStore = Loadable({
  loader: () => import("./containers/pet-store"),
  loading: null,
});
const Github = Loadable({
  loader: () => import("./containers/github"),
  loading: null,
});
const Login = Loadable({
  loader: () => import("./containers/login"),
  loading: null,
});

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
