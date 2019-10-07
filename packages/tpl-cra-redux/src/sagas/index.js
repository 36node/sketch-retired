import { watchApi, watchCron, watchHelper, effects } from "@36node/redux";
import { watchXlsx } from "@36node/redux-xlsx";
import { makeSessionWatcher } from "@36node/redux-session";

import { auth } from "../actions/api";
import { domain } from "../constants";
import { LOGIN, REFRESH, LOGOUT } from "../actions/types";

const refresh = auth.makeRefresh(domain.session);
const { fork, all } = effects;
const watchSession = makeSessionWatcher({
  refresh,
  loginSuccessTypes: [LOGIN.SUCCESS, REFRESH.SUCCESS],
  logoutSuccessTypes: [LOGOUT.SUCCESS],
});

export default function* root() {
  yield all([
    fork(watchHelper),
    fork(watchApi),
    fork(watchCron),
    fork(watchSession),
    fork(watchXlsx),
  ]);
}
