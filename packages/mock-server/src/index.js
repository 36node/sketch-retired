const jsonServer = require("json-server");
const { handleAggs } = require("./aggregation");
const toJsonServer = require("./query-to-jsonserver");
const _ = require("lodash");
const { safeToArray } = require("./util");

/**
 *
 * @param {import('express').Application} app
 * @param {Object} opts
 * @param {Function} shouldMock
 */
function MockServer(opts) {
  const {
    db = {},
    rewrites = {},
    routers = [],
    aggregations = {},
    shouldMock,
  } = opts;

  const app = opts.app ? opts.app : jsonServer.create();

  const dbRouter = jsonServer.router(db);

  // rewrites
  app.use(jsonServer.rewriter(rewrites));

  // user defined routers
  app.use(jsonServer.bodyParser);

  if (!shouldMock) {
    app.use((req, res, next) => {
      req.query = toJsonServer(req.query);
      return next();
    });
  } else {
    app.use((req, res, next) => {
      if (shouldMock(req)) {
        req.query = toJsonServer(req.query);
        return next();
      }
      return next();
    });
  }

  // if has _group or _select,  remove _limit, _start, _sort, _order from query
  app.use((req, res, next) => {
    const query = req.query || {};
    const path = req.path;
    const { _group, _select, _limit, _start, _sort, _order } = query;

    // has agg config
    const agg = aggregations[path];

    req.cusQuery = {};

    if (_group) req.cusQuery._group = _group;
    if (_select) req.cusQuery._select = _select;

    // has agg and _group, move _limit, _start, _sort, _order to cusQuery
    if (agg && _group) {
      req.cusQuery._limit = _limit;
      req.cusQuery._start = _start;
      req.cusQuery._sort = _sort;
      req.cusQuery._order = _order;

      delete req.query._limit;
      delete req.query._start;
      delete req.query._sort;
      delete req.query._order;
    }

    delete req.query._group;
    delete req.query._select;

    return next();
  });

  // routes
  routers.forEach(router => app.use(router));

  // handle select
  const handleSelect = (req, data = []) => {
    const query = req.cusQuery || {};

    const select = safeToArray(query._select);

    // handle select
    if (select) {
      // positive
      const positive = select.filter(s => !_.startsWith(s, "-"));

      // minus
      const minus = select
        .filter(s => s.startsWith("-"))
        .map(s => _.trimStart(s, "-"))
        .filter(s => s !== "id");

      let chain = _.chain(data);

      if (positive && positive.length > 0) {
        chain = chain.map(d => _.pick(d, ["id", ...positive]));
      }

      if (minus && minus.length > 0) {
        chain = chain.map(d => _.omit(d, minus));
      }

      return chain.value();
    }

    return data;
  };

  // handle aggs
  dbRouter.render = (req, res) => {
    let data = handleAggs(aggregations, req, res);
    data = handleSelect(req, data);
    res.jsonp(data);
  };

  if (!shouldMock) {
    app.use(dbRouter);
  } else {
    app.use((req, res, next) => {
      if (shouldMock(req)) {
        return dbRouter(req, res, next);
      }
      return next();
    });
  }

  return app;
}

module.exports = MockServer;
