import { isAction, makeAction } from "../lib";

export const TOGGLE = "TOGGLE";

export const isToggle = isAction(TOGGLE);

/**
 * create a toggle action
 *
 * @param {string} key key of action
 * @param {boolean} payload boolean value
 */
export const makeToggle = (key = "default", initPayload) => {
  if (typeof initPayload !== "undefined" && typeof initPayload !== "boolean") {
    throw new Error("Toggle initPayload should be boolean");
  }

  return makeAction(TOGGLE, key, initPayload);
};
