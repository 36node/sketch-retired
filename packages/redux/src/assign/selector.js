import { makeSelector } from "../lib";

export const makeAssignSelector = (key = "default", initState) =>
  makeSelector(`assign.${key}`, initState);
