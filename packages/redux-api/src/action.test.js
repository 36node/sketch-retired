import { isRequest } from "./action";

test("is request action of api", () => {
  const action = {
    type: "@@api/WHAT_A_API_REQUEST",
    payload: {},
    meta: {
      key: "something",
    },
  };

  expect(isRequest(action)).toBe(true);
});
