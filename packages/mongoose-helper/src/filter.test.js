import build from "./filter";

test("should build filter _like", () => {
  const raw = {
    views_me_like: "cd9",
    views_like: "aBc",
  };
  expect(build(raw)).toEqual({
    views: { $regex: /aBc/i },
    viewsMe: { $regex: /cd9/i },
  });
});

test("should build filter _lt _gt", () => {
  const raw = {
    views_me_lt: 20,
    views_me_gt: 10,
  };
  expect(build(raw)).toEqual({ viewsMe: { $lt: 20, $gt: 10 } });
});

test("should build filter _lte _gte", () => {
  const raw = {
    views_me_lte: 20,
    views_me_gte: 10,
  };
  expect(build(raw)).toEqual({ viewsMe: { $lte: 20, $gte: 10 } });
});

test("should build filter * and none", () => {
  const raw = {
    assignees: "*",
    followers: "none",
  };
  expect(build(raw)).toEqual({
    assignees: { $ne: [] },
    followers: { $eq: [] },
  });
});

test("should build filter 'true' or 'false'", () => {
  const raw = {
    onsite: "true",
    toggle: "false",
  };

  expect(build(raw)).toEqual({
    onsite: true,
    toggle: false,
  });
});

test("should not build filter true or false", () => {
  const raw = {
    onsite: true,
    toggle: false,
  };

  expect(build(raw)).toEqual({
    onsite: true,
    toggle: false,
  });
});

test("should build filter q", () => {
  const raw = {
    q: "hello",
  };
  expect(build(raw)).toEqual({ $text: { $search: "hello" } });
});

test("should convert id to _id", () => {
  const raw = { id: "xxxxxx" };
  expect(build(raw)).toEqual({ _id: "xxxxxx" });
});
