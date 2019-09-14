import { makeSelector } from "../lib";
import { initState } from "./reducer";

export const makeProgressSelector = (key = "default", init = initState) =>
  makeSelector(`progress.${key}`, init);
