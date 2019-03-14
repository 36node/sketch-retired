const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");
const rewireEslint = require("react-app-rewire-eslint");
const rewireStyledComponents = require("react-app-rewire-styled-components");
const rewireReactHotLoader = require("react-app-rewire-hot-loader");
const mock = require("./mock");
const jsonServer = require("json-server");
const pause = require("connect-pause");
const antdTheme = require("./antd.theme");

const stopMock = process.env.MOCK === "false";
const { serverOpts, db, rewrite } = mock;

/**
 * compose web dev server config
 * @param {function} f
 * @param {function} g
 */
const compose = (f, g) => app => f(g(app));

module.exports = {
  webpack: function(config, env) {
    // for eslint
    config = rewireEslint(config, env);

    // for decorator
    config = injectBabelPlugin("transform-decorators-legacy", config);

    // hot reloader
    config = rewireReactHotLoader(config, env);

    // for styled-components
    config = rewireStyledComponents(config, env, {
      displayName: process.env.NODE_ENV !== "production",
      fileName: false,
      pure: true,
      ssr: false,
    });

    // for antd
    config = injectBabelPlugin(
      ["import", { libraryName: "antd", libraryDirectory: "es", style: true }], // change importing css to less
      config
    );
    config = rewireLess.withLoaderOptions({
      modifyVars: antdTheme,
      javascriptEnabled: true,
    })(config, env);

    return config;
  },
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
        const router = jsonServer.router(db);

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

        app.use(jsonServer.rewriter(rewrite));
        app.use((req, res, next) => {
          if (shouldMockReq(req)) {
            return router(req, res, next);
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
