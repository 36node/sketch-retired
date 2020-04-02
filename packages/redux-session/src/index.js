import { TOKEN } from "./constants";

export { makeSessionWatcher } from "./saga";
export { withSession } from "./withSession";
export { history } from "./history";
export { ProtectedRoute } from "./protect";

export const getToken = () => sessionStorage.getItem(TOKEN);
