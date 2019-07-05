import { camelCase } from "lodash";

/**
 * camel case key
 * @param {String} key
 */
export const camelCaseKey = key => {
  return key
    .split(".")
    .map(k => camelCase(k))
    .join(".");
};
