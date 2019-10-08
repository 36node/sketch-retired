import React, { Component } from "react";
import { ReactReduxContext } from "react-redux";

/** for code splitting */
export const withSaga = (...sagaArr) => WrappedComponent => {
  class Injector extends Component {
    constructor(props) {
      super(props);
      this.tasks = [];

      const { reduxContext } = props;
      if (sagaArr) this.tasks = sagaArr.map(s => reduxContext.store.runSaga(s));
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentWillUnmount() {
      this.tasks.forEach(task => task.cancel());
    }
  }

  const Wrapped = props => {
    return (
      <ReactReduxContext.Consumer>
        {reduxContext => <Injector reduxContext={reduxContext} {...props} />}
      </ReactReduxContext.Consumer>
    );
  };
  return Wrapped;
};
