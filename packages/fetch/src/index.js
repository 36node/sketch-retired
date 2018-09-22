import qs from "qs";
import { pickBy, identity } from "lodash";
import createError from "http-errors";

export default async function myFetch(url, opt = {}) {
  let { query, body, headers = {} } = opt;
  let endpoint = query ? `${url}?${qs.stringify(query, { skipNulls: true })}` : url;

  if (body) body = JSON.stringify(body);

  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  };

  const res = await fetch(
    endpoint,
    pickBy(
      {
        ...opt,
        body,
        headers,
      },
      identity
    )
  );

  // if not json, deal it as text
  if (res.headers.get("content-type").toLowerCase() !== "application/json") {
    return res.text();
  }

  // for delete method
  if (res.statusText === "No Content") {
    return;
  }

  const resBody = await res.json();
  const resHeaders = {};

  // not 20x or 30x response
  if (!res.ok) throw createError(res.status, resBody);

  res.headers.forEach((val, key) => (resHeaders[key] = val));
  return { body: resBody, headers: resHeaders };
}
