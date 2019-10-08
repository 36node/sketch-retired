import http from "wxapp-http";

const httpClient = http.create({
  maxConcurrent: 10,
  timeout: 0,
  header: {},
  dataType: "json",
});

function generateResponse(res) {
  let header = res.header || {};
  let config = res.config || {};
  return {
    ok: ((res.statusCode / 200) | 0) === 1, // 200-299
    status: res.statusCode,
    statusText: res.errMsg,
    url: config.url,
    clone: () => generateResponse(res),
    text: () =>
      Promise.resolve(
        typeof res.data === "string" ? res.data : JSON.stringify(res.data)
      ),
    json: () => {
      if (typeof res.data === "object") return Promise.resolve(res.data);
      let json = {};
      try {
        json = JSON.parse(res.data);
      } catch (err) {
        console.error(err);
      }
      return json;
    },
    blob: () => Promise.resolve(new Blob([res.data])),
    headers: {
      keys: () => Object.keys(header),
      entries: () => {
        let all = [];
        for (let key in header) {
          if (header.hasOwnProperty(key)) {
            all.push([key, header[key]]);
          }
        }
        return all;
      },
      get: n => {
        const key = Object.keys(header).find(
          key => key.toLowerCase() === n.toLowerCase()
        );
        return header[key];
      },
      has: n =>
        !!Object.keys(header).find(
          key => key.toLowerCase() === n.toLowerCase()
        ),
      forEach: fn => {
        for (let key in header) {
          if (header.hasOwnProperty(key)) {
            fn([header[key], key]);
          }
        }
      },
    },
  };
}

export default typeof fetch === "function"
  ? fetch.bind()
  : function(url, options) {
      options = options || {};
      return httpClient
        .request(options.method || "get", url, options.body, options.headers)
        .then(res => Promise.resolve(generateResponse(res)))
        .catch(res => Promise.reject(generateResponse(res)));
    };
