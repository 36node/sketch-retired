import React from "react";
import MediaQuery from "react-responsive";

import Container from "../components/container";
import Jumbotron from "../components/jumbotron";

export default () => (
  <Container>
    <MediaQuery minDeviceWidth={800}>
      <Jumbotron> Welcome to 36node! </Jumbotron>
    </MediaQuery>
    <MediaQuery maxDeviceWidth={800}>
      <Jumbotron> Welcome </Jumbotron>
    </MediaQuery>
    <p> We are the core team of Adventurer.tech company. </p>
  </Container>
);
