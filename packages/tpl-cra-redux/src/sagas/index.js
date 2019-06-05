import { fork, all } from "redux-saga/effects";
import { watchApis } from "@36node/redux-api";
import watchSession from "./session";

// registerHooks({
//   onSuccess: function*(base, action, body) {
//     // handle login success
//     if (base === LOGIN) {
//       // ie. save session
//       yield call(history.push, "/");
//     }

//     // handle logout success
//     if (base === LOGOUT) {
//       yield call(history.push, "/login");
//     }
//   },
//   onFailure: function*(base, action, error) {
//     if (error.status === 401) {
//       yield call(history.push, "/login");
//       message.error("Auth");
//     } else {
//       const msg = error.message || "Api request error";
//       message.error(msg);
//     }
//   },
// });

export default function* root() {
  yield all([fork(watchApis), fork(watchSession)]);
}
