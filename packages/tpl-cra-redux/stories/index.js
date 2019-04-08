import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { Welcome, Button } from "@storybook/react/demo";
import "antd/dist/antd.css";

import {
  Container,
  Content,
  Footer,
  Header,
  Jumbotron,
  Title,
} from "../src/components/layout";
import Logo from "../src/components/logo";
import { text, boolean } from "@storybook/addon-knobs";

// default demo
storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add(
    "with text",
    () => (
      <Button onClick={action("clicked")}>
        {text("Label", "Hello Button")}
      </Button>
    ),
    {
      notes: "A very simple button",
      info: {
        inline: true,
        header: false,
      },
    }
  )
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

// our components

storiesOf("General", module).add("Logo", () => <Logo />);

storiesOf("Layout", module)
  .add("Container", () => <Container> Welcome to 36node! </Container>)
  .add("Content", () => (
    <Content> Here are the exmaples of our components. </Content>
  ))
  .add("Footer", () => (
    <Footer>Template-React-Redux ©2018 Created by 36node</Footer>
  ))
  .add("Header", () => <Header> Here are the Header. </Header>)
  .add("Jumbotron", () => <Jumbotron> Here are the Jumbotron. </Jumbotron>)
  .add("Title", () => <Title> Here are the Title. </Title>);
