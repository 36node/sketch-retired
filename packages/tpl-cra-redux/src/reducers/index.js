import { combineReducers } from "redux";

import { apiReducers } from "@36node/redux-api";
import { reduxUiReducers } from "@36node/redux-ui";

export default combineReducers({
  ...apiReducers,
  ...reduxUiReducers,
});
