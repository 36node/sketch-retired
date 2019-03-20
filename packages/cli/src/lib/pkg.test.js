import path from "path";

import { getPackage } from "./pkg";

const dest = path.resolve(__dirname, "../../");
describe("Test Package helper", () => {
  it("should throw error with no package.json", async () => {
    try {
      getPackage("wrongpath");
    } catch (err) {
      expect(err.code).toBe("ENOENT");
    }
  });

  it("should get right pkg template", () => {
    return expect(getPackage(dest)).toHaveProperty("template", "cli");
  });
});
