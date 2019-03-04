import denormalize from "./denormalize";
import querystring from "query-string";
let testObj = {};
describe("Test denormalize", () => {
  it("should parse pagination", () => {
    testObj = { ...testObj, ...{ limit: 10, offset: 0 } };
    const ret = denormalize(testObj);

    expect(ret._limit).toBe(10);
    expect(ret._offset).toBe(0);

    console.log(querystring.stringify(ret));
  });

  it("should parse sort", () => {
    testObj = { ...testObj, ...{ sort: ["updatedAt", "-createdAt"] } };
    const ret = denormalize(testObj);
    expect(ret._sort).toEqual(
      expect.arrayContaining(["updatedAt", "-createdAt"])
    );
    console.log(querystring.stringify(ret));
  });

  it("should parse populate", () => {
    testObj = { ...testObj, ...{ populate: "user" } };

    const ret = denormalize(testObj);
    expect(ret._populate).toEqual("user");
    console.log(querystring.stringify(ret));
  });

  it("should parse select", () => {
    testObj = { ...testObj, ...{ select: ["name", "age"] } };
    const ret = denormalize(testObj);
    expect(ret._select).toEqual(expect.arrayContaining(["name", "age"]));
    console.log(querystring.stringify(ret));
  });

  it("should parse group", () => {
    testObj = { ...testObj, ...{ group: "type" } };
    const ret = denormalize(testObj);
    expect(ret._group).toEqual("type");
    console.log(querystring.stringify(ret));
  });

  it("should parse array filter", () => {
    const { filter = {} } = testObj;

    testObj = {
      ...testObj,
      ...{
        filter: {
          ...filter,
          type: { $in: ["test1", "test2"] },
        },
      },
    };
    const ret = denormalize(testObj);
    expect(ret.type).toEqual(expect.arrayContaining(["test1", "test2"]));
    console.log(querystring.stringify(ret));
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
    console.log(querystring.stringify(ret));
  });

  it("should parse full text search", () => {
    const { filter = {} } = testObj;

    testObj = {
      ...testObj,
      ...{
        filter: {
          ...filter,
          $text: { $search: "hello" },
        },
      },
    };
    const ret = denormalize(testObj);

    expect(ret.q).toEqual("hello");
    console.log(querystring.stringify(ret));
  });

  it("should parse array wildcard", () => {
    const { filter = {} } = testObj;
    testObj = {
      ...testObj,
      ...{
        filter: {
          ...filter,
          assignees: { $ne: [] },
          followers: { $eq: [] },
        },
      },
    };
    const ret = denormalize(testObj);

    expect(ret.assignees).toEqual("*");
    expect(ret.followers).toEqual("none");
    console.log(querystring.stringify(ret));
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
    console.log(querystring.stringify(ret));
  });

  it("should parse custom", () => {
    testObj = {
      ...testObj,
      _expand: "department",
    };
    const ret = denormalize(testObj);
    expect(ret._expand).toEqual("department");
    console.log(querystring.stringify(ret));
  });
});
