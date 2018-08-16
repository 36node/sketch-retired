import ExtendableError from "./extendable";

describe("ExtendableError", function() {
  it("should have right inherits", () => {
    const err = new ExtendableError();
    expect(err instanceof ExtendableError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
  it("should have the default message", () => {
    const err = new ExtendableError();
    expect(err.message).toBe("Extandable error");
  });
  it("should set the right message", () => {
    const err = new ExtendableError("haha");
    expect(err.message).toBe("haha");
  });
  it("should have right name", () => {
    const err = new ExtendableError();
    expect(err.name).toBe("ExtendableError");
  });
});
