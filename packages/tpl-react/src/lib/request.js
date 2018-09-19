import qs from "qs";

import { clean } from "../lib";

function getHeaders() {
  const session = localStorage.getItem("session");
  const Authorization = session ? `Bearer ${JSON.parse(session).accessToken}` : undefined;

  return clean({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization,
  });
}

async function request(endpoint, options) {
  const headers = Object.assign(getHeaders(), options.headers);
  const body = options.body ? JSON.stringify(options.body) : undefined;
  const opts = Object.assign({}, options, { body, headers });
  const query = qs.stringify(options.query, { skipNulls: true });
  const url = `${endpoint}?${query}`;

  return fetch(url, opts)
    .then(response => {
      return response.json().then(json => ({ json, response }));
    })
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    });
}

export default request;
