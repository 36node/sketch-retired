import { combineReducers } from "redux";
import { xlsxReducerRoot } from "@36node/redux-xlsx";
import {
  apiReducerRoot,
  assignReducerRoot,
  toggleReducerRoot,
  cronReducerRoot,
  progressReducerRoot,
  formReducerRoot,
} from "@36node/redux";

export default combineReducers({
  ...apiReducerRoot,
  ...assignReducerRoot,
  ...toggleReducerRoot,
  ...cronReducerRoot,
  ...progressReducerRoot,
  ...formReducerRoot,
  ...xlsxReducerRoot,
});
