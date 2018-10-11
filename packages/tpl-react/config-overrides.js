const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");
const rewireEslint = require("react-app-rewire-eslint");
const rewireStyledComponents = require("react-app-rewire-styled-components");
const mock = require("./mock");
const jsonServer = require("json-server");
const pause = require("connect-pause");

const mockFn = mock.mockFn;
const mockServerOpts = mock.serverOpts;
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
        const serverOpts = mockServerOpts();
        if (!serverOpts.enable) {
          return app;
        }

        // config mock server
        const defaultsOpts = {
          logger: !serverOpts.quiet,
          readOnly: serverOpts.readOnly,
          noCors: serverOpts.noCors,
          noGzip: serverOpts.noGzip,
          bodyParser: true,
        };
        const router = jsonServer.router(mockFn());
        const middlewares = jsonServer.defaults(defaultsOpts);
        // serveStatic middleware conflict with create-react-app, removed it
        const usedMiddleWares = middlewares.filter(m => m.name !== "serveStatic");
        app.use(usedMiddleWares);
        const base = serverOpts.base || "/api";
        if (serverOpts.delay) {
          app.use(base, pause(serverOpts.delay));
        }
        app.use(base, router);
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
