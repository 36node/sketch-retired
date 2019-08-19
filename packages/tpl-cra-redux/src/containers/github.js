import React from "react";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";

import Layout from "../components/layout";

import { githubActions } from "../actions";
import { githubSelectors } from "../selectors";

const { Container, Jumbotron } = Layout;

@connect(state => {
  const listReposState = githubSelectors.selectRepos(state) || {};
  return {
    repos: listReposState.result || [],
  };
})
export default class extends React.PureComponent {
  componentDidMount() {
    this.fetchRepos();
  }

  fetchRepos = () => {
    this.props.dispatch(githubActions.listRepos({ org: "36node" }));
  };

  render() {
    const { repos } = this.props;
    return (
      <DocumentTitle title="@36node - Github Example">
        <Container>
          <Jumbotron>
            36node has {repos.length} public repos in github.
          </Jumbotron>
          <div>
            {repos.map((r, key) => {
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
            })}
          </div>
        </Container>
      </DocumentTitle>
    );
  }
}
