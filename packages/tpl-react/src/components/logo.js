import styled from "styled-components";

import svg from "./logo.svg";

const Logo = styled.img.attrs({ src: svg })`
  animation: app-logo-spin infinite 20s linear;
  height: 80px;
`;

export default Logo;
