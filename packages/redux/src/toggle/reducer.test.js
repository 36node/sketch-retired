import { toggleReducerRoot } from "./reducer";
import { makeToggle } from "./action";

/**
 * reducer test
 */

describe("test reducer", () => {
  const toggle = makeToggle("test");

  test("should set true", () => {
    const reducer = toggleReducerRoot.toggle;

    const nextState = reducer({}, toggle(true));

    expect(nextState.test).toBe(true);
  });

  test("should set false", () => {
    const reducer = toggleReducerRoot.toggle;
    const nextState = reducer({}, toggle(false));

    expect(nextState.test).toBe(false);
  });

  test("should overturn toggle", () => {
    const reducer = toggleReducerRoot.toggle;
    let nextState = reducer({}, toggle(true));

    nextState = reducer(nextState, toggle());
    expect(nextState.test).toBe(false);
    nextState = reducer(nextState, toggle());
    expect(nextState.test).toBe(true);
  });
});
