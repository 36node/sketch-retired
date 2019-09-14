import { makeSelector } from "../lib";
import { initState } from "./reducer";

export const makeFormSelector = (key = "default", init = initState) =>
  makeSelector(`form.${key}`, init);
