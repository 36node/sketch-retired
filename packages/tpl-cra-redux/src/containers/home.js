import React from "react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { Button, Row } from "antd";
import Sample from "@36node/template-react-component";

import Layout from "../components/layout";

import { globalActions } from "../actions";

const { Container, Jumbotron } = Layout;

@connect(state => ({}))
export default class extends React.PureComponent {
  handleLogout = () => {
    this.props.dispatch(globalActions.logout());
  };

  handleUnauth = () => {
    this.props.dispatch(globalActions.unauth());
  };

  render() {
    return (
      <DocumentTitle title="@36node - Template React Redux">
        <Container>
          <MediaQuery minDeviceWidth={800}>
            <Jumbotron> Welcome to 36node Sketch </Jumbotron>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={800}>
            <Jumbotron> Welcome </Jumbotron>
          </MediaQuery>
          <Sample />
          <p>
            {" "}
            We are the core team of
            <a href="https://www.adventurer.tech"> Adventurer Tech Company. </a>
          </p>
          <Row>
            <Button onClick={this.handleLogout}> Click to Logout </Button>
          </Row>
          <p />
          <Row>
            <Button onClick={this.handleUnauth}>
              Click to mock unauthorized api request
            </Button>
          </Row>
        </Container>
      </DocumentTitle>
    );
  }
}
