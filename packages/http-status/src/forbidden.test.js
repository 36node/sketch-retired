import ExtendableError from "./extendable";
import Forbidden from "./forbidden";

describe("Forbidden", function() {
  it("should have right inherits", () => {
    const err = new Forbidden();
    expect(err instanceof Forbidden).toBe(true);
    expect(err instanceof ExtendableError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
  it("should have the default message", () => {
    const err = new Forbidden();
    expect(err.message).toBe("Request is forbidden");
  });
  it("should set the right message", () => {
    const err = new Forbidden("haha");
    expect(err.message).toBe("haha");
  });
  it("should have right name", () => {
    const err = new Forbidden();
    expect(err.name).toBe("Forbidden");
  });
});
