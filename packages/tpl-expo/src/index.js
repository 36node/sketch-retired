import React from "react";
import { Provider } from "react-redux";
import store from "./redux";
import Chrome from "./chrome";

export default function App() {
  return (
    <Provider store={store}>
      <Chrome />
    </Provider>
  );
}
