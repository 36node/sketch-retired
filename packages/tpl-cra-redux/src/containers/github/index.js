import React from "react";
import { connect } from "react-redux";
import { makeApiSelector } from "@36node/redux";

import Layout from "../../components/layout";
import { github } from "../../actions/api";

const { Container, Jumbotron } = Layout;
const listRepos = github.makeListRepos("github", { org: "36node" });
const selectRepos = makeApiSelector("github");

@connect(state => {
  const listReposState = selectRepos(state);
  return {
    repos: listReposState.result || [],
  };
})
export default class extends React.PureComponent {
  componentDidMount() {
    this.fetchRepos();
  }

  fetchRepos = () => {
    this.props.dispatch(listRepos());
  };

  render() {
    const { repos } = this.props;
    return (
      <Container>
        <Jumbotron>36node has {repos.length} public repos in github.</Jumbotron>
        <div>
          {repos.map((r, key) => {
            return (
              <p key={key}>
                <a target="_blank" href={r.html_url} rel="noopener noreferrer">
                  {r.name}
                </a>
              </p>
            );
          })}
        </div>
      </Container>
    );
  }
}
