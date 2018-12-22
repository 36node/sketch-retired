import { stringify } from "./query-string";
import clean from "clean-deep";

/**
 * A wrapper of fetch
 *
 * @param {string} url url string
 * @param {object} opt options
 * @returns {Promise<object>} result {body, headers}
 */
export default async function(url, opt = {}) {
  let { query, body, headers = {} } = clean(opt);
  let endpoint = query
    ? `${url}?${stringify(query, { skipNulls: true })}`
    : url;

  if (body) body = JSON.stringify(body);

  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  };

  const res = await fetch(
    endpoint,
    clean({
      ...opt,
      body,
      headers,
    })
  );

  const result = { headers: {} };
  if (res.statusText === "No Content") {
  } else if (
    !res.headers.get("content-type") ||
    !res.headers.get("content-type").includes("application/json")
  ) {
    result.body = { message: await res.text() }; // text result 处理成 object
  } else {
    result.body = await res.json();
  }

  // not 20x or 30x response
  if (!res.ok) {
    const err = { ...result.body, status: res.status };
    throw err;
  }

  res.headers.forEach((val, key) => (result.headers[key] = val));
  return result;
}
