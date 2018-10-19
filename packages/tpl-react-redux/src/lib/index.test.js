import { add } from "./index";

test("calls math.add", () => {
  const res = add(1, 2);
  expect(res).toBe(3);
});
