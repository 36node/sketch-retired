import toJsonServer from "./to-json-server";

test("should handle _limit and _offset", () => {
  const fromUrl = { _limit: 10, _offset: 10 };

  const ret = toJsonServer(fromUrl);

  expect(ret._limit).toEqual(10);
  expect(ret._start).toEqual(10);
});

test("should handle single _sort", () => {
  const fromUrl = { _sort: "age" };
  const ascRet = toJsonServer(fromUrl);

  expect(ascRet._sort).toBe("age");
  expect(ascRet._order).toBe("asc");

  fromUrl._sort = "-age";
  const descRet = toJsonServer(fromUrl);
  expect(descRet._sort).toBe("age");
  expect(descRet._order).toBe("desc");
});

test("should handle mutil _sort", () => {
  const fromUrl = { _sort: ["age", "-price"] };
  const ret = toJsonServer(fromUrl);

  expect(ret._sort).toBe("age,price");
  expect(ret._order).toBe("asc,desc");
});

test("should handle _populate", () => {
  const fromUrl = { _populate: "owner" };
  const ret = toJsonServer(fromUrl);

  expect(ret._embed).toBe("owner");
});

test("should handle filters", () => {
  const fromUrl = {
    _populate: "owner",
    _sort: ["age", "-price"],
    _limit: 10,
    _offset: 10,
    _group: "tag", // json-server not support， should remove from ret
    tag: "DOG",
    age_gt: 10,
    name_like: "nik",
  };

  const ret = toJsonServer(fromUrl);
  expect(ret._embed).toBe("owner");
  expect(ret._sort).toBe("age,price");
  expect(ret._order).toBe("asc,desc");
  expect(ret._limit).toEqual(10);
  expect(ret._start).toEqual(10);
  expect(ret._group).toBeUndefined();
  expect(ret.tag).toBe("DOG");
  expect(ret.age_gt).toBe(10);
  expect(ret.name_like).toBe("nik");
});
