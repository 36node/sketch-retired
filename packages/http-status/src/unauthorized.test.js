import ExtendableError from "./extendable";
import Unauthorized from "./unauthorized";

describe("Unauthorized", function() {
  it("should have right inherits", () => {
    const err = new Unauthorized();
    expect(err instanceof Unauthorized).toBe(true);
    expect(err instanceof ExtendableError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
  it("should have the default message", () => {
    const err = new Unauthorized();
    expect(err.message).toBe("Unauthorized request");
  });
  it("should set the right message", () => {
    const err = new Unauthorized("haha");
    expect(err.message).toBe("haha");
  });
  it("should have right name", () => {
    const err = new Unauthorized();
    expect(err.name).toBe("Unauthorized");
  });
});
