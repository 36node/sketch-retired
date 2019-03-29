import querystring from "querystring";
import normalize from "./normalize";

let testQuery = "";

describe("Test normalize", () => {
  it("Should safe to number", () => {
    const queryUrl = "_limit=abc&_offset=foo";

    const ret = normalize(querystring.parse(queryUrl));

    expect(ret.limit).toBe("abc");
    expect(ret.offset).toBe("foo");
  });

  it("Should parse pagination", () => {
    testQuery += "_limit=10&_offset=0";

    const ret = normalize(querystring.parse(testQuery));

    expect(ret.limit).toBe(10);
    expect(ret.offset).toBe(0);
  });

  it("Should parse sort", () => {
    testQuery += "&_sort=updatedAt&_sort=-createdAt";
    const ret = normalize(querystring.parse(testQuery));

    expect(ret.sort).toEqual(
      expect.arrayContaining(["updatedAt", "-createdAt"])
    );
  });

  it("Should parse populate ", () => {
    testQuery += "&_populate=user";
    const ret = normalize(querystring.parse(testQuery));
    expect(ret.populate).toEqual("user");
  });

  it("should parse select", () => {
    testQuery += "&_select=name&_select=age";
    const ret = normalize(querystring.parse(testQuery));
    expect(ret.select).toEqual(expect.arrayContaining(["name", "age"]));
  });

  it("should parse group", () => {
    testQuery += "&_group=type";
    const ret = normalize(querystring.parse(testQuery));
    expect(ret.group).toEqual("type");
  });

  it("should parse array filter", () => {
    testQuery += "&type=test1&type=test2";
    const ret = normalize(querystring.parse(testQuery));

    expect(ret.filter.type).toEqual(expect.arrayContaining(["test1", "test2"]));
  });

  it("should parse gt,lt,gte,lte,ne", () => {
    testQuery += "&age_gt=10&age_lt=20";
    let ret = normalize(querystring.parse(testQuery));
    expect(ret.filter.age).toEqual({ $gt: "10", $lt: "20" });

    testQuery += "&level_gte=10&level_lte=20";
    ret = normalize(querystring.parse(testQuery));
    expect(ret.filter.level).toEqual({ $gte: "10", $lte: "20" });

    testQuery += "&tag_ne=pretty";
    ret = normalize(querystring.parse(testQuery));
    expect(ret.filter.tag).toEqual({ $ne: "pretty" });
  });

  it("should parse like", () => {
    testQuery += "&title_like=hello&plate_like=沪A";
    const ret = normalize(querystring.parse(testQuery));
    expect(ret.filter.title).toEqual({ $regex: /hello/i });
    expect(ret.filter.plate).toEqual({ $regex: /沪A/i });
  });

  it("should parse custom", () => {
    testQuery += "&_expand=department";
    const ret = normalize(querystring.parse(testQuery));

    expect(ret._expand).toEqual("department");
  });
});
