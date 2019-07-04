import { camelCaseKey } from "./utils";

test("should camel key", () => {
  const testKey = "GITHUB.REPOS";

  const key = camelCaseKey(testKey);

  expect(key).toEqual("github.repos");
});
