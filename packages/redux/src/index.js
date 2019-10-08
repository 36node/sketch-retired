export { Provider, connect } from "react-redux";

export {
  isAction,
  makeAction,
  makeReducer,
  makeSelector,
  inject,
  configureStore,
  tapOn,
  tapOnLatest,
} from "./lib";

/**
 * assign
 */
export { makeAssign, isAssign } from "./assign/action";
export { assignReducerRoot } from "./assign/reducer";
export { makeAssignSelector } from "./assign/selector";

/**
 * toggle
 */
export { makeToggle, isToggle } from "./toggle/action";
export { toggleReducerRoot } from "./toggle/reducer";
export { makeToggleSelector } from "./toggle/selector";

/**
 * api
 */
export {
  createApiMaker,
  makeApiReset,
  makeApiTypes,
  isApi,
  isRequest,
  isSuccess,
  isFailure,
} from "./api/action";
export { apiReducerRoot } from "./api/reducer";
export { makeApiSelector } from "./api/selector";
export { watchApi, reputApi } from "./api/saga";

/**
 * cron
 */
export { makeCron, cronTypes, isCron } from "./cron/action";
export { cronReducerRoot } from "./cron/reducer";
export { makeCronSelector } from "./cron/selector";
export { watchCron, tapCronTick } from "./cron/saga";

/**
 * form
 */
export { formTypes, isForm, makeForm } from "./form/action";
export { formReducerRoot } from "./form/reducer";
export { makeFormSelector } from "./form/selector";

/**
 * progress
 */
export { progressTypes, isProgress, makeProgress } from "./progress/action";
export { progressReducerRoot } from "./progress/reducer";
export { makeProgressSelector } from "./progress/selector";
