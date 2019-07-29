laylout example:

```js
import Container from "./container";
import Content from "./content";
import Footer from "./footer";
import Header from "./header";
import Jumbotron from "./jumbotron";
import Title from "./title";
import { Layout } from "antd";

<Layout>
  <Header>Here are the Header. </Header>

  <Container>
    <Title> Here are the Title. </Title>
    <Jumbotron> Here are the Jumbotron. </Jumbotron>
    <Content> Here are the exmaples of our components. </Content>
  </Container>

  <Footer>Template-React-Redux ©2018 Created by 36node</Footer>
</Layout>;
```
