import realFetch from "node-fetch";
import wrapper from "./wrapper";

if (!global.fetch) {
  global.fetch = module.exports;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}

export default wrapper;
