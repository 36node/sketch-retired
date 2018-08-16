import ExtendableError from "./extendable";
import NotFound from "./not-found";

describe("NotFound", function() {
  it("should have right inherits", () => {
    const err = new NotFound();
    expect(err instanceof NotFound).toBe(true);
    expect(err instanceof ExtendableError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
  it("should have the default message", () => {
    const err = new NotFound();
    expect(err.message).toBe("Resource not found");
  });
  it("should set the right message", () => {
    const err = new NotFound("haha");
    expect(err.message).toBe("haha");
  });
  it("should have right name", () => {
    const err = new NotFound();
    expect(err.name).toBe("NotFound");
  });
});
