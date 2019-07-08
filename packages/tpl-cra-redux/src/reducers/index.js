import { combineReducers } from "redux";

import { apiReducers } from "@36node/redux-api";
import { reduxUiReducers } from "@36node/redux-ui";
import { formReducer } from "@36node/redux-form";
import { xlsxReducer } from "@36node/redux-xlsx";
import { cronReducer } from "@36node/redux-cron";

export default combineReducers({
  ...apiReducers,
  ...reduxUiReducers,
  forms: formReducer,
  xlsxs: xlsxReducer,
  crons: cronReducer,
});
