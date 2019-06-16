import React from "react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { Button } from "antd";
import Sample from "@36node/template-react-component";

import { Container, Jumbotron } from "../components/layout";
import { globalActions } from "../actions";

@connect(state => ({}))
export default class extends React.PureComponent {
  handleLogout = () => {
    this.props.dispatch(globalActions.logout.request());
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
          <Button onClick={this.handleLogout}> Try Logout </Button>
        </Container>
      </DocumentTitle>
    );
  }
}
