const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");
const rewireEslint = require("react-app-rewire-eslint");
const rewireStyledComponents = require("react-app-rewire-styled-components");

module.exports = function override(config, env) {
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
};
