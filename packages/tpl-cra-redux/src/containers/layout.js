import React from "react";
import { Layout, Breadcrumb } from "antd";

import { Content, Footer, Header } from "../components/layout";
import Logo from "../components/logo";
import Nav from "./nav";

export const withMainLayout = Component => {
  return props => (
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
        <Component {...props} />
      </Content>
      <Footer>Template-CRA-Redux ©2018 Created by 36node</Footer>
    </Layout>
  );
};
