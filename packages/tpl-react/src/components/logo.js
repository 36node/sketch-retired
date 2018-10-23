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
  height: 80px;
`;

export default Logo;
