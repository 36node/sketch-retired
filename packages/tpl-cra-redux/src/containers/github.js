import React from "react";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";

import { listRepos } from "../actions";
import { selectRepos } from "../selectors";

import { Container, Jumbotron } from "../components/layout";

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
