import realFetch from "node-fetch";
import wrapper from "./wrapper";

if (!global.fetch) {
  global.fetch = realFetch;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}

export default wrapper;
