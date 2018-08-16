import ExtendableError from "./extendable";
import InvalidRequest from "./invalid";

describe("InvalidRequest", function() {
  it("should have right inherits", () => {
    const err = new InvalidRequest();
    expect(err instanceof InvalidRequest).toBe(true);
    expect(err instanceof ExtendableError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
  it("should have the default message", () => {
    const err = new InvalidRequest();
    expect(err.message).toBe("Invalid request");
  });
  it("should set the right message", () => {
    const err = new InvalidRequest("haha");
    expect(err.message).toBe("haha");
  });
  it("should have right name", () => {
    const err = new InvalidRequest();
    expect(err.name).toBe("InvalidRequest");
  });
});
