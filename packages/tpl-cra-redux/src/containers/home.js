import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { Button } from "antd";
import DocumentTitle from "react-document-title";

import { logout } from "../actions";

import { Container, Jumbotron } from "../components/layout";

@connect(state => ({}))
export default class extends React.PureComponent {
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  render() {
    return (
      <DocumentTitle title="@36node - Template React Redux">
        <Container>
          <MediaQuery minDeviceWidth={800}>
            <Jumbotron> Welcome to 36node Sketch! </Jumbotron>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={800}>
            <Jumbotron> Welcome </Jumbotron>
          </MediaQuery>
          <p>
            {" "}
            We are the core team of
            <a href="https://www.adventurer.tech"> Adventurer Tech Company. </a>
          </p>
          <Button onClick={this.handleLogout}> Try Logout </Button>
        </Container>
      </DocumentTitle>
    );
  }
}
