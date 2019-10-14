import React from "react";
import { connect } from "react-redux";
import { Skeleton } from "antd";
import { makeApiSelector } from "@36node/redux";

import Container from "../../components/layout/container";
import Jumbotron from "../../components/layout/jumbotron";
import withBreadCrumb from "../../components/withBreadCrumb";
import { github } from "../../actions/api";
import { domain } from "../../constants";

const REPOS_KEY = domain.github.repos;
const listRepos = github.makeListRepos(REPOS_KEY, { org: "36node" });
const selectRepos = makeApiSelector(REPOS_KEY);

@withBreadCrumb("Github")
@connect(state => {
  const listReposState = selectRepos(state);
  return {
    loading: listReposState.loading,
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
    const { repos, loading } = this.props;

    return (
      <Container>
        <Jumbotron>36node has {repos.length} public repos in github.</Jumbotron>
        <div>
          {loading ? (
            <Skeleton active />
          ) : (
            repos.map((r, key) => {
              return (
                <p key={key}>
                  <a
                    target="_blank"
                    href={r.html_url}
                    rel="noopener noreferrer"
                  >
                    {r.name}
                  </a>
                </p>
              );
            })
          )}
        </div>
      </Container>
    );
  }
}
