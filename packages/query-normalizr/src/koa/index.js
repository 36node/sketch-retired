// use query-string
import qs from "query-string";
import normalize from "../lib/normalize";

export default function normalizor(opts = {}) {
  return async function(ctx, next) {
    const queryStr = ctx.querystring;

    if (queryStr) {
      const queryFromUrl = qs.parse(queryStr);

      ctx.rawQuery = ctx.query;
      ctx.query = normalize(queryFromUrl);
    }

    await next();
  };
}
