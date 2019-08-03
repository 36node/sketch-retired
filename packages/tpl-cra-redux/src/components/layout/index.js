import { Layout as LayoutOrign } from "antd";
import styled from "styled-components";

import Container from "./container";
import Content from "./content";
import Footer from "./footer";
import Header from "./header";
import Jumbotron from "./jumbotron";
import Title from "./title";

const Layout = styled(LayoutOrign)`
  width: 100%;
`;

Layout.Container = Container;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Header = Header;
Layout.Jumbotron = Jumbotron;
Layout.Title = Title;

/** @component */
export default Layout;
