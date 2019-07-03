const jsonServer = require("json-server");
const { toJsonServer } = require("@36node/query-normalizr");
const { handleAggs } = require("./aggregation");

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

  // routes
  routers.forEach(router => app.use(router));

  // handle aggs
  dbRouter.render = (req, res) => {
    res.jsonp(handleAggs(aggregations, req, res));
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
