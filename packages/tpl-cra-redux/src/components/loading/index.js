import React, { Component } from "react";
import { Spin, Row } from "antd";
import styled from "styled-components";

class Loading extends Component {
  render() {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={this.props.className}
      >
        <Spin size="large" />
      </Row>
    );
  }
}

/** @component */
export default styled(Loading)`
  height: 100vh;
  width: 100%;
`;
