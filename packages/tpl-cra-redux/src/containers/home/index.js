import React, { Fragment } from "react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { Button, Breadcrumb, Row } from "antd";
import Sample from "@36node/template-react-component";

import Layout from "../../components/layout";
import { auth } from "../../actions/api";
import { domain } from "../../constants";

const { Container, Jumbotron } = Layout;
const logout = auth.makeLogout(domain.session);
const unAuth = auth.makeUnAuth(domain.session);

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
      <Fragment>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
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
      </Fragment>
    );
  }
}
