import { isAction, makeAction } from "../lib";

const ASSIGN = "ASSIGN";

export const isAssign = isAction(ASSIGN);

/**
 * make an assign action creator
 */
export const makeAssign = (key = "default", init) =>
  makeAction(ASSIGN, key, init);
