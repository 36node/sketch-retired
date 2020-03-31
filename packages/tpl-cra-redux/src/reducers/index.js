import { xlsxReducerRoot } from "@36node/redux-xlsx";
import {
  apiReducerRoot,
  assignReducerRoot,
  toggleReducerRoot,
  cronReducerRoot,
  progressReducerRoot,
} from "@36node/redux";

const reducers = {
  ...apiReducerRoot,
  ...assignReducerRoot,
  ...toggleReducerRoot,
  ...cronReducerRoot,
  ...progressReducerRoot,
  ...xlsxReducerRoot,
};

export default reducers;
