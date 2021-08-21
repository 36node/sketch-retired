import normalize from "./";

test("should build filter _like", () => {
  const query = {
    viewsA_like: "cd9",
    viewsB_like: ["cd9", "aBc"],
  };
  expect(normalize(query)).toEqual({
    filter: {
      viewsA: /cd9/i,
      viewsB: { $in: [/cd9/i, /aBc/i] },
    },
  });
});

test("should build filter _lt _gt", () => {
  const query = {
    views_lt: 20,
    views_gt: 10,
  };
  expect(normalize(query)).toEqual({ filter: { views: { $lt: 20, $gt: 10 } } });
});

test("should build filter _lte _gte", () => {
  const query = {
    views_lte: 20,
    views_gte: 10,
  };
  expect(normalize(query)).toEqual({
    filter: { views: { $lte: 20, $gte: 10 } },
  });
});

test("should build filter * and none", () => {
  const query = {
    assignees: "*",
    followers: "none",
  };
  expect(normalize(query)).toEqual({
    filter: {
      assignees: { $ne: [] },
      followers: { $eq: [] },
    },
  });
});

test("should build filter q", () => {
  const query = {
    q: "hello world",
  };
  expect(normalize(query)).toEqual({
    filter: { $text: { $search: "hello world" } },
  });
});

test("should convert id to _id", () => {
  const query = { id: "xxxxxx" };
  expect(normalize(query)).toEqual({ filter: { _id: "xxxxxx" } });
});

test("should trim _ for reserved keys", () => {
  const query = {
    _limit: 10,
    _offset: 0,
    _sort: "-abc",
    _populate: "user",
    _select: "name",
    _group: "grade",
    age: 1,
  };
  expect(normalize(query)).toEqual({
    limit: 10,
    offset: 0,
    sort: "-abc",
    populate: "user",
    select: "name",
    group: "grade",
    filter: { age: 1 },
  });
});

test("should build filter for nested key", () => {
  const query = {
    "people.age_lt": 20,
    "people.age_gt": 10,
    "people.gender": "male",
  };
  expect(normalize(query)).toEqual({
    filter: { "people.age": { $lt: 20, $gt: 10 }, "people.gender": "male" },
  });
});
