import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { Button } from "antd";

import { logout } from "../actions";

import Container from "../components/container";
import Jumbotron from "../components/jumbotron";
import { withMainLayout } from "./layout";

@withMainLayout
@connect(state => ({}))
export default class extends React.PureComponent {
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  render() {
    return (
      <Container>
        <MediaQuery minDeviceWidth={800}>
          <Jumbotron> Welcome to 36node Sketch! </Jumbotron>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={800}>
          <Jumbotron> Welcome </Jumbotron>
        </MediaQuery>
        <p> We are the core team of Adventurer.tech company. </p>
        <Button onClick={this.handleLogout}> Try Logout </Button>
      </Container>
    );
  }
}
