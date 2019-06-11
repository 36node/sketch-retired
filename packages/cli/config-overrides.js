const {
  override,
  addBabelPlugin,
  useEslintRc,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackResolve,
} = require("customize-cra");
const jsonServer = require("json-server");
const pause = require("connect-pause");
const importCwd = require("import-cwd");
const path = require("path");

const stopMock = process.env.MOCK === "false" || process.env.MOCK === "FALSE";
const antdTheme = importCwd.silent("./antd.theme") || {};
const defaultServerOpts = { delay: 500 };
const { serverOpts = defaultServerOpts, db = {}, rewrites = {}, routers = [] } =
  importCwd.silent("./mock") || {};

const { toJsonServer } = require("@36node/query-normalizr");

const addWebpackRules = rules => config => {
  if (!config.module) {
    config.module = {};
  }
  if (!config.module.rules) {
    config.module.rules = [];
  }
  config.module.rules = config.module.rules.concat(rules);
  return config;
};

const resolve = function resolve(dir) {
  return path.join(process.cwd(), dir);
};

/**
 * compose web dev server config
 * @param {function} f
 * @param {function} g
 */
const compose = (f, g) => app => f(g(app));

module.exports = {
  webpack: override(
    // for eslint
    useEslintRc(),
    // for decorator
    addDecoratorsLegacy(),
    // for lodash
    addBabelPlugin(["react-hot-loader/babel"]),
    // for lodash
    addBabelPlugin(["lodash"]),
    // for styled-components
    addBabelPlugin([
      "styled-components",
      {
        displayName: process.env.NODE_ENV !== "production",
        fileName: false,
        pure: true,
        ssr: false,
      },
    ]),
    // for antd
    addBabelPlugin(
      ["import", { libraryName: "antd", libraryDirectory: "es", style: true }] // change importing css to less
    ),
    addLessLoader({
      modifyVars: antdTheme,
      javascriptEnabled: true,
    }),
    addWebpackRules([
      {
        test: /\.mjs$/,
        type: "javascript/auto",
      },
    ]),
    addWebpackResolve({
      alias: {
        src: resolve("src"),
        actions: resolve("src/actions"),
        components: resolve("src/components"),
        containers: resolve("src/containers"),
        reducers: resolve("src/reducers"),
        sagas: resolve("src/sagas"),
        sdk: resolve("src/sdk"),
        selectors: resolve("src/selectors"),
      },
    })
  ),
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      if (stopMock) {
        return config;
      }

      /**
       * mock server hoc
       * @param {Express.Application} app
       */
      function mockServer(app) {
        const jsonRouter = jsonServer.router(db);

        const shouldMockReq = req => {
          return (
            req.method !== "GET" ||
            (req.headers.accept &&
              req.headers.accept.indexOf("application/json") !== -1)
          );
        };

        if (serverOpts.delay) {
          app.use((req, res, next) => {
            if (shouldMockReq(req)) {
              return pause(serverOpts.delay)(req, res, next);
            }
            return next();
          });
        }

        app.use(jsonServer.rewriter(rewrites));

        // user defined routers
        app.use(jsonServer.bodyParser);

        // user query normalizr
        app.use((req, res, next) => {
          if (shouldMockReq(req)) {
            req.query = toJsonServer(req.query);
            return next();
          }
          return next();
        });

        routers.forEach(router => app.use(router));

        // json server router
        app.use((req, res, next) => {
          if (shouldMockReq(req)) {
            return jsonRouter(req, res, next);
          }
          return next();
        });

        return app;
      }

      const prev = config.before;

      config.before = compose(
        mockServer,
        app => {
          prev(app);
          return app;
        }
      );

      return config;
    };
  },
};
