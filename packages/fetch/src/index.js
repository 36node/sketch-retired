import qs from "qs";

export default async function myFetch(url, opt) {
  let { query, body, headers = {} } = opt;

  const jwt = localStorage.getItem("jwt");
  const Authorization = jwt ? `Bearer ${jwt}` : undefined;
  const endpoint = query ? `${url}?${qs.stringify(query, { skipNulls: true })}` : url;
  if (body) body = JSON.stringify(body);

  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization,
    ...headers,
  };

  const res = await fetch(endpoint, {
    ...opt,
    body,
    headers,
  });

  // if not json, deal it as text
  if (res.headers.get("content-type").toLowerCase() !== "application/json") {
    return res.text();
  }

  // for delete method
  if (res.statusText === "No Content") {
    return;
  }

  const resBody = res.json();
  const resHeaders = {};

  // not 20x or 30x response
  if (!res.ok) throw resBody;

  res.headers.forEach((val, key) => (resHeaders[key] = val));
  return { body: resBody, headers: resHeaders };
}
