import React, { Component } from "react";
import { ReactReduxContext } from "react-redux";

/** ability to inject saga and reducer dynamically, not ready for production */
const inject = (reducers = {}, saga = []) => WrappedComponent => {
  class Injector extends Component {
    constructor(props) {
      super(props);

      const { reduxContext } = props;

      reduxContext.store.runReducer(reducers);
      reduxContext.store.runSaga(saga);
    }

    render() {
      return <WrappedComponent {...this.props} />;
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
export { inject };
