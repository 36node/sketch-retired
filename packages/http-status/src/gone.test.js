import ExtendableError from "./extendable";
import Gone from "./gone";

describe("Gone", function() {
  it("should have right inherits", () => {
    const err = new Gone();
    expect(err instanceof Gone).toBe(true);
    expect(err instanceof ExtendableError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
  it("should have the default message", () => {
    const err = new Gone();
    expect(err.message).toBe("Resource is gone");
  });
  it("should set the right message", () => {
    const err = new Gone("haha");
    expect(err.message).toBe("haha");
  });
  it("should have right name", () => {
    const err = new Gone();
    expect(err.name).toBe("Gone");
  });
});
