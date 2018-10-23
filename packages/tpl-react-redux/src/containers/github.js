import React from "react";
import { connect } from "react-redux";

import { listRepos } from "../actions";
import { selectRepos } from "../selectors";

import { withMainLayout } from "./layout";
import Container from "../components/container";
import Jumbotron from "../components/jumbotron";

@withMainLayout
@connect(state => ({
  repos: selectRepos(state),
}))
export default class extends React.PureComponent {
  componentDidMount() {
    this.fetchRepos();
  }

  fetchRepos = () => {
    this.props.dispatch(listRepos({ org: "36node" }));
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
