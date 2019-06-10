import { escape } from "./regex";

describe("#Regex", () => {
  it("should escape", () => {
    const str = "/abc/$#/de0/12";
    expect(escape(str)).toBe("\\/abc\\/\\$#\\/de0\\/12");
  });
});
