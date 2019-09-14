import { pickF } from "./lib";

describe("lib test", () => {
  it("should pick flattern", () => {
    const obj = { a: 1, b: { c: 1 } };
    expect(pickF(obj, ["b.c"])).toEqual({ "b.c": 1 });
  });
});
