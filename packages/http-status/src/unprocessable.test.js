import ExtendableError from "./extendable";
import UnprocessableEntity from "./unprocessable";

describe("UnprocessableEntity", function() {
  it("should have right inherits", () => {
    const err = new UnprocessableEntity();
    expect(err instanceof UnprocessableEntity).toBe(true);
    expect(err instanceof ExtendableError).toBe(true);
    expect(err instanceof Error).toBe(true);
  });
  it("should have the default message", () => {
    const err = new UnprocessableEntity();
    expect(err.message).toBe("Unprocessable entity");
  });
  it("should set the right message", () => {
    const err = new UnprocessableEntity("haha");
    expect(err.message).toBe("haha");
  });
  it("should have right name", () => {
    const err = new UnprocessableEntity();
    expect(err.name).toBe("UnprocessableEntity");
  });
});
