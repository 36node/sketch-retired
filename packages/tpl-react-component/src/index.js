import React from "react";
import styled from "styled-components";

export default class ReactComponent extends React.PureComponent {
  name = "jam";

  render() {
    return <A>Hello world {this.name} </A>;
  }
}

const A = styled.div`
  font-size: 20px;
  color: red;
`;
