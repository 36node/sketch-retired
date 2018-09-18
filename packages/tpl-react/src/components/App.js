import React from "react";
import sdk from "../lib/sdk";

export default class App extends React.Component {
  state = {
    repos: []
  };

  componentWillMount() {
    this.fetchRepos();
  }

  fetchRepos = () => {
    sdk.getRepos().then(ret => {
      this.setState({
        repos: ret
      });
    });
  };

  render() {
    return (
      <div>
        <div>36node has {this.state.repos.length} public repos in github:</div>
        <ul>
          {this.state.repos.map(r => {
            return (
              <li>
                <a target="_blank" href={r.html_url}>
                  {r.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
