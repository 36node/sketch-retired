import { foo } from "./index";

jest.mock("./index");

test("foo should be called", () => {
  foo();
  expect(foo).toBeCalled();
});
