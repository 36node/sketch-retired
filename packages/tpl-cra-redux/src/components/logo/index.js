import styled, { keyframes } from "styled-components";

import svg from "./logo.svg";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.img.attrs({ src: svg })`
  animation: ${spin} infinite 20s linear;
  width: 60px;
  height: 31px;
  margin: 16px 24px 16px -16px;
  float: left;
`;

/** @component */
export default Logo;
