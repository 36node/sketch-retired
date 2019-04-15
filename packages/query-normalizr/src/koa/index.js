// use query-string
import normalize from "../lib/normalize";

export default function normalizor(opts = {}) {
  return function(ctx, next) {
    const queryStr = ctx.querystring;

    if (queryStr) {
      ctx.normalizedQuery = normalize(ctx.query);
    }

    return next();
  };
}
