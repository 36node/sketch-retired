const {
  override,
  addBabelPlugin,
  useEslintRc,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackPlugin,
} = require("customize-cra");
const pause = require("connect-pause");
const importCwd = require("import-cwd");
const path = require("path");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

const stopMock = process.env.MOCK === "false" || process.env.MOCK === "FALSE";
const antdTheme = importCwd.silent("./antd.theme") || {};
const defaultServerOpts = { delay: 500 };
const { serverOpts = defaultServerOpts, db = {}, rewrites = {}, routers = [] } =
  importCwd.silent("./mock") || {};

const mockServer = require("@36node/mock-server");

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

const filterWarningsPlugin = new FilterWarningsPlugin({
  exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
});

const printConfig = config => {
  console.log(JSON.stringify(config, null, 2));
  process.exit(0);
  return config;
};

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
    addWebpackPlugin(filterWarningsPlugin)
    // printConfig // for debug
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
      function configMock(app) {
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

        mockServer({ app, db, rewrites, routers, shouldMock: shouldMockReq });

        return app;
      }

      const prev = config.before;

      config.before = compose(
        configMock,
        app => {
          prev(app);
          return app;
        }
      );

      return config;
    };
  },
};
