import { makeSelector } from "../lib";

export const makeToggleSelector = (key = "default", initState = false) =>
  makeSelector(`toggle.${key}`, initState);
