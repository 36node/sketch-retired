import { Layout } from "antd";
import styled from "styled-components";

import Container from "./container";
import Content from "./content";
import Footer from "./footer";
import Header from "./header";
import Jumbotron from "./jumbotron";
import Title from "./title";

const LayoutExt = styled(Layout)`
  width: 100%;
`;

LayoutExt.Container = Container;
LayoutExt.Content = Content;
LayoutExt.Footer = Footer;
LayoutExt.Header = Header;
LayoutExt.Jumbotron = Jumbotron;
LayoutExt.Title = Title;

/** @component */
export default LayoutExt;
