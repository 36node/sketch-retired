import React from "react";
import styled from "styled-components";

export default class ReactComponent extends React.PureComponent {
  name = "jam";

  render() {
    return <Container>Hello world {this.name} </Container>;
  }
}

const Container = styled.div`
  font-size: 20px;
  color: red;
`;
