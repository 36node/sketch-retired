import queryNormalizr from "./koa";

export { queryNormalizr };
export { default as normalize } from "./lib/normalize";
export { default as denormalize } from "./lib/denormalize";
export { default as toJsonServer } from "./lib/to-json-server";

// deprecated
export const QueryNormalizr = (...args) => {
  console.log("QueryNormalizr is deprecated, plz use queryNormalizr instead.");
  return queryNormalizr(...args);
};
