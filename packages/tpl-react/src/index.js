import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import registerServiceWorker from "./lib/registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
