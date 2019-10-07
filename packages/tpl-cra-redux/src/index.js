import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@36node/redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./app";
import rootSaga from "./sagas";
import reducer from "./reducers";

const store = configureStore(reducer);
store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
