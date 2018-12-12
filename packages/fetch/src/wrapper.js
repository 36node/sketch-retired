import { stringify } from "./query-string";
import createError from "http-errors";
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
    result.body = await res.text();
  } else {
    result.body = await res.json();
  }

  // not 20x or 30x response
  if (!res.ok) throw createError(res.status, result.body);

  res.headers.forEach((val, key) => (result.headers[key] = val));
  return result;
}
