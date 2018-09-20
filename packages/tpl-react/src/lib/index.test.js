import { clean } from "./index";

describe("clean", function() {
  it("should clean recursively", () => {
    const obj = {
      a: "test",
      b: undefined,
      c: null,
      d: {
        a: undefined,
        b: null,
      },
      e: 1,
      f: false,
      g: {
        h: "test",
      },
      i: [],
    };
    expect(clean(obj)).toEqual({
      a: "test",
      e: 1,
      f: false,
      g: { h: "test" },
      i: [],
    });
  });
});
