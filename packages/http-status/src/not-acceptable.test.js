import ExtendableError from "./extendable";
import NotAcceptable from "./not-acceptable";

describe("NotAcceptable", function() {
  it("should have right inherits", () => {
    const err = new NotAcceptable();
    expect(err instanceof NotAcceptable).toBe(true);
    expect(err instanceof ExtendableError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
  it("should have the default message", () => {
    const err = new NotAcceptable();
    expect(err.message).toBe("Not acceptable request content");
  });
  it("should set the right message", () => {
    const err = new NotAcceptable("haha");
    expect(err.message).toBe("haha");
  });
  it("should have right name", () => {
    const err = new NotAcceptable();
    expect(err.name).toBe("NotAcceptable");
  });
});
