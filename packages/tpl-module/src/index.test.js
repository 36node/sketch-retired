import fs from "fs";

import { listFiles } from "./index";

jest.mock("fs");

test("list files", () => {
  const result = ["a"];
  fs.readdirSync.mockReturnValue(result);
  expect(listFiles("/tmp")).toBe(result);
});
