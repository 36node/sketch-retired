import { makeSelector } from "../lib";
import { initState } from "./reducer";

export const makeCronSelector = (key = "default", init = initState) =>
  makeSelector(`cron.${key}`, init);
