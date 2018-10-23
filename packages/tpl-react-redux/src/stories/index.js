import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Welcome, Button } from "@storybook/react/demo";

import Container from "../src/components/container";
import Content from "../src/components/content";
import Footer from "../src/components/footer";
import Header from "../src/components/header";
import Jumbotron from "../src/components/jumbotron";
import Logo from "../src/components/logo";
import Title from "../src/components/title";

// default demo
storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />);

storiesOf("Button", module)
  .add("with text", () => <Button onClick={action("clicked")}>Hello Button</Button>)
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

// our components
storiesOf("Container", module).add("default", () => <Container> Welcome to 36node! </Container>);
storiesOf("Content", module).add("default", () => (
  <Content> Here are the exmaples of our components. </Content>
));
storiesOf("Footer", module).add("default", () => (
  <Footer>Template-React-Redux ©2018 Created by 36node</Footer>
));
storiesOf("Header", module).add("default", () => <Header> Here are the Header. </Header>);
storiesOf("Jumbotron", module).add("default", () => (
  <Jumbotron> Here are the Jumbotron. </Jumbotron>
));
storiesOf("Logo", module).add("default", () => <Logo />);
storiesOf("Title", module).add("default", () => <Title> Here are the Title. </Title>);
