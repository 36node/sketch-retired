import React from "react";
import { hot } from "react-hot-loader/root";
import { Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import { Layout } from "antd";
import { history, ProtectedRoute } from "@36node/redux-session";

import Logo from "./components/logo";
import Nav from "./containers/nav";
import Loading from "./components/loading";
import Home from "./containers/home";
import Login from "./containers/login";

const { Content, Footer, Header } = Layout;

/* template-example-start */
const PetStore = Loadable({
  loader: () => import("./containers/store"),
  loading: Loading,
});
const Github = Loadable({
  loader: () => import("./containers/github"),
  loading: Loading,
});
const ReduxUi = Loadable({
  loader: () => import("./containers/redux-ui"),
  loading: Loading,
});
/* template-example-end */

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute redirect="/login" component={Main} />
    </Switch>
  </Router>
);

const Main = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header>
      <Logo />
      <Nav />
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* template-example-start */}
        <Route path="/github" component={Github} />
        <Route path="/pet-store" component={PetStore} />
        <Route path="/redux-ui" component={ReduxUi} />
        {/* template-example-end */}
      </Switch>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      Template-CRA-Redux ©2019 Created by 36node
    </Footer>
  </Layout>
);

const HotApp = process.env.NODE_ENV === "development" ? hot(App) : App;
export default HotApp;
