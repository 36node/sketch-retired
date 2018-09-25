import React, { Component } from "react";
import { Spin, Alert } from "antd";

import Github from "./sdk/github";
import Petstore from "./sdk/petstore";
import { STORE_BASE, TOKEN } from "./config";

import Logo from "./components/logo";
import Title from "./components/title";
import Header from "./components/header";
import Container from "./components/container";
import Content from "./components/content";
import Jumbotron from "./components/jumbotron";

const github = new Github();
const petstore = new Petstore({
  base: STORE_BASE,
  token: TOKEN,
});

class App extends Component {
  state = {
    repos: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchRepos();
  }

  fetchRepos = () => {
    this.setState({ loading: true });
    github.repo.listRepos({ org: "36node" }).then(ret => {
      this.setState({
        repos: ret.body,
        loading: false,
      });
    });

    // just a log output for testing purpose
    // we should have a petstore's UI in template-react-redux
    petstore.pet
      .listPets({ query: { limit: 10 } })
      .then(ret => console.log("petstore api success: ", ret.body));
  };

  render() {
    const { repos, loading } = this.state;

    const $spin = (
      <Spin tip="Loading...">
        <Alert message="Fetching 36node's repositories..." type="info" />
      </Spin>
    );

    const $content = (
      <Content>
        <Jumbotron>36node has {repos.length} public repos in github.</Jumbotron>
        <div>
          {this.state.repos.map((r, key) => {
            return (
              <p key={key}>
                <a target="_blank" href={r.html_url} rel="noopener noreferrer">
                  {r.name}
                </a>
              </p>
            );
          })}
        </div>
      </Content>
    );

    return (
      <Container>
        <Header>
          <Logo />
          <Title>Welcome to 36node's template-react</Title>
        </Header>
        {loading ? $spin : $content}
      </Container>
    );
  }
}

export default App;
