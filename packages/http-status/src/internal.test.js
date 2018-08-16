import ExtendableError from "./extendable";
import InternalError from "./internal";

describe("InternalError", function() {
  it("should have right inherits", () => {
    const err = new InternalError();
    expect(err instanceof InternalError).toBe(true);
    expect(err instanceof ExtendableError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
  it("should have the default message", () => {
    const err = new InternalError();
    expect(err.message).toBe("Internal server error");
  });
  it("should set the right message", () => {
    const err = new InternalError("haha");
    expect(err.message).toBe("haha");
  });
  it("should have right name", () => {
    const err = new InternalError();
    expect(err.name).toBe("InternalError");
  });
});
