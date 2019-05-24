import { combineReducers } from "redux";

import { apiReducers } from "@36node/redux-api";

export default combineReducers({
  ...apiReducers,
});
