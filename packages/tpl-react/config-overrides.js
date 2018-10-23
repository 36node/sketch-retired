const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");
const rewireEslint = require("react-app-rewire-eslint");
const rewireStyledComponents = require("react-app-rewire-styled-components");
const mock = require("./mock");
const jsonServer = require("json-server");
const pause = require("connect-pause");
const dotenv = require("dotenv");

dotenv.config();

const mockFn = mock.mockFn;
const mockServerOpts = mock.serverOpts;

const disableMock = process.env.REACT_APP_DISABLE_MOCK === "true";

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
      modifyVars: { "@primary-color": "#1DA57A" },
      javascriptEnabled: true,
    })(config, env);

    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      /**
       * mock server hoc
       * @param {Express.Application} app
       */
      function mockServer(app) {
        if (disableMock) {
          return app;
        }

        const serverOpts = mockServerOpts();
        const router = jsonServer.router(mockFn());

        const shouldMock = req => {
          return (
            req.method !== "GET" ||
            (req.headers.accept && req.headers.accept.indexOf("application/json") !== -1)
          );
        };

        if (serverOpts.delay) {
          app.use((req, res, next) => {
            if (shouldMock(req)) {
              return pause(serverOpts.delay)(req, res, next);
            }
            return next();
          });
        }

        app.use((req, res, next) => {
          if (shouldMock(req)) {
            return router(req, res, next);
          }
          return next();
        });

        return app;
      }

      config.before = compose(
        config.before,
        mockServer
      );

      return config;
    };
  },
};
