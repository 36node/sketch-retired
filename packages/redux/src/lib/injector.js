import React, { Component } from "react";
import { ReactReduxContext } from "react-redux";

/** ability to inject saga and reducer dynamically, not ready for production */
const inject = (saga, reducers) => WrappedComponent => {
  class Injector extends Component {
    constructor(props) {
      super(props);

      const { reduxContext } = props;

      if (saga) reduxContext.store.runSaga(saga);
      if (reducers) reduxContext.store.runReducer(reducers);
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
