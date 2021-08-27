import wrapper from "./wrapper";
import wxFetch from "./wxapp-fetch";

/* eslint-disable */
if (typeof window === 'undefined' && typeof wx !== 'undefined') {
  global.fetch = wxFetch;
  global.Response = wxFetch.Response;
  global.Headers = wxFetch.Headers;
  global.Request = wxFetch.Request;
}

export default wrapper;
