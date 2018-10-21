import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";

import Content from "./components/content";
import Footer from "./components/footer";
import Header from "./components/header";
import Logo from "./components/logo";
import Nav from "./nav";

import Home from "./containers/home";
import PetStore from "./containers/pet-store";
import Github from "./containers/github";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/pet-store" component={PetStore} />
              <Route path="/github" component={Github} />
            </Switch>
          </Content>
          <Footer>Template-React-Redux ©2018 Created by 36node</Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
