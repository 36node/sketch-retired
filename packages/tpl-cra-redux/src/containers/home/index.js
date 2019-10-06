import React from "react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { Button, Row } from "antd";
import Sample from "@36node/template-react-component";

import { auth } from "../../actions/api";
import { domain } from "../../constants";
import Container from "../../components/layout/container";
import Jumbotron from "../../components/layout/jumbotron";
import withBreadCrumb from "../../components/withBreadCrumb";

const logout = auth.makeLogout(domain.session);
const unAuth = auth.makeUnAuth(domain.session);

@withBreadCrumb("Home")
@connect(state => ({}))
export default class extends React.PureComponent {
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  handleUnauth = () => {
    this.props.dispatch(unAuth());
  };

  render() {
    return (
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
    );
  }
}
