import { makeSelector } from "@36node/redux";

import { initState } from "./reducer";

export const makeXlsxSelector = (key = "default", init = initState) =>
  makeSelector(`xlsx.${key}`, init);
