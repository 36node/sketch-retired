import denormalize from "./denormalize";
import querystring from "querystring";

let testObj = {};
describe("Test denormalize", () => {
  it("should parse single array", () => {
    const queryObject = {
      type: ["type1"],
    };
    const ret = denormalize(queryObject);

    expect(querystring.stringify(ret)).toBe("type=type1");
  });

  it("Should safe to number", () => {
    const queryObj = {
      limit: "abc",
      offset: "foo",
    };

    const ret = denormalize(queryObj);

    expect(ret._limit).toBe("abc");
    expect(ret._offset).toBe("foo");
  });

  it("should parse pagination", () => {
    testObj = { ...testObj, ...{ limit: 10, offset: 0 } };
    const ret = denormalize(testObj);

    expect(ret._limit).toBe(10);
    expect(ret._offset).toBe(0);
  });

  it("should parse sort", () => {
    testObj = { ...testObj, ...{ sort: ["updatedAt", "-createdAt"] } };
    const ret = denormalize(testObj);
    expect(ret._sort).toEqual(
      expect.arrayContaining(["updatedAt", "-createdAt"])
    );
  });

  it("should parse populate", () => {
    testObj = { ...testObj, ...{ populate: "user" } };

    const ret = denormalize(testObj);
    expect(ret._populate).toEqual("user");
  });

  it("should parse select", () => {
    testObj = { ...testObj, ...{ select: ["name", "age"] } };
    const ret = denormalize(testObj);
    expect(ret._select).toEqual(expect.arrayContaining(["name", "age"]));
  });

  it("should parse group", () => {
    testObj = { ...testObj, ...{ group: "type" } };
    const ret = denormalize(testObj);
    expect(ret._group).toEqual("type");
  });

  it("should parse array filter", () => {
    const { filter = {} } = testObj;

    testObj = {
      ...testObj,
      ...{
        filter: {
          ...filter,
          type: ["test1", "test2"],
        },
      },
    };
    const ret = denormalize(testObj);
    expect(ret.type).toEqual(expect.arrayContaining(["test1", "test2"]));
  });

  it("should parse gt,lt,gte,lte,ne ", () => {
    const { filter = {} } = testObj;

    testObj = {
      ...testObj,
      ...{
        filter: {
          ...filter,
          age: { $gt: "10", $lt: "20" },
          level: { $gte: "10", $lte: "20" },
          tag: { $ne: "pretty" },
        },
      },
    };
    const ret = denormalize(testObj);

    expect(ret.age_gt).toEqual("10");
    expect(ret.age_lt).toEqual("20");
    expect(ret.level_gte).toEqual("10");
    expect(ret.level_lte).toEqual("20");
    expect(ret.tag_ne).toEqual("pretty");
  });

  it("should test like", () => {
    const { filter = {} } = testObj;
    testObj = {
      ...testObj,
      ...{
        filter: {
          ...filter,
          title: { $regex: /hello/i },
          plate: { $regex: /沪A/i },
        },
      },
    };

    const ret = denormalize(testObj);

    expect(ret.title_like).toEqual("hello");
    expect(ret.plate_like).toEqual("沪A");
  });

  it("should parse custom", () => {
    testObj = {
      ...testObj,
      _expand: "department",
    };
    const ret = denormalize(testObj);
    expect(ret._expand).toEqual("department");

    expect(querystring.stringify(ret)).toBe(
      "_limit=10&_offset=0&_sort=updatedAt&_sort=-createdAt&_populate=user&_select=name&_select=age&_group=type&type=test1&type=test2&age_gt=10&age_lt=20&level_gte=10&level_lte=20&tag_ne=pretty&title_like=hello&plate_like=%E6%B2%AAA&_expand=department"
    );
  });
});
