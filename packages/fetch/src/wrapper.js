import { stringify } from "./query-string";

function isJson(res) {
  return (
    res.headers.get("content-type") &&
    res.headers.get("content-type").includes("application/json")
  );
}

/**
 * A wrapper of fetch
 *
 * @param {string} url url string
 * @param {object} opt options
 * @returns {Promise<object>} result {body, headers}
 */
export default async function(url, opt = {}) {
  let { query, body, headers = {} } = opt;
  const search = stringify(query, { skipNulls: true });
  const endpoint = search ? `${url}?${search}` : url;

  if (body) body = JSON.stringify(body);
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  };

  const res = await fetch(endpoint, {
    ...opt,
    body,
    headers,
  });

  if (res.statusText === "No Content") {
    return {};
  }

  const result = { headers: {} };
  if (!isJson(res)) {
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
