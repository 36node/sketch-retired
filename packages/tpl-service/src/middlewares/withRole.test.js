import withRole from "./withRole";
import { Role } from "../constants";

describe("withRole test", () => {
  it("should throw err", async () => {
    const mock = {
      state: {
        jwt: {
          roles: ["PM"],
        },
      },
    };
    const noop = () => {};
    let message = false;

    try {
      await withRole(Role.OWNER)(mock, noop);
    } catch (err) {
      message = err.message;
    }
    expect(message).toBe("Require roles OWNER");
  });

  it("should not throw err", async () => {
    const mock = {
      state: {
        jwt: {
          roles: ["OWNER"],
        },
      },
    };
    const noop = () => {};
    let message = false;

    try {
      await withRole(Role.OWNER)(mock, noop);
    } catch (err) {
      message = err.message;
    }
    expect(message).toBeFalsy();
  });

  it("should respect ADMIN", async () => {
    const mock = {
      state: {
        jwt: {
          roles: ["ADMIN"],
        },
      },
    };

    const noop = () => {};
    await withRole(Role.OWNER)(mock, noop);
    expect(mock.state.jwt.roles).toEqual(Object.values(Role));
  });
});
