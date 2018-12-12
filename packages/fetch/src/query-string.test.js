import { stringify, parseUrl } from "./query-string";

test("stringify ok", async () => {
  const query = { a: "b" };
  const search = stringify(query);
  expect(search).toBe("a=b");
});

test("parse url ok", async () => {
  const endpoint = "http://api.36node.com?a=b&c=d";
  const { url, query } = parseUrl(endpoint);
  expect(url).toBe("http://api.36node.com");
  expect(query).toEqual({ a: "b", c: "d" });
});
