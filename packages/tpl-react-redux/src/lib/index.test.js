import { delay } from "./index";

test("should delay work", async () => {
  jest.useFakeTimers();
  const spy = jest.fn();
  delay(100).then(spy);
  expect(spy).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.runAllTimers();
  await Promise.resolve();

  // Now our callback should have been called!
  expect(spy).toBeCalled();
  expect(spy).toHaveBeenCalledTimes(1);
  jest.useRealTimers();
});
