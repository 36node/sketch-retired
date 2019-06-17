import { combineReducers } from "redux";

import { apiReducers } from "@36node/redux-api";
import { reduxUiReducers } from "@36node/redux-ui";
import { formReducer } from "@36node/redux-form";

export default combineReducers({
  ...apiReducers,
  ...reduxUiReducers,
  forms: formReducer,
});
