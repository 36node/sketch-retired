const antdTheme = require("../antd.theme");

function injectBabelPlugin(plugin, config) {
  var rules = config.module.rules;

  rules.forEach(r => {
    if (r.use) {
      var loader = r.use.find(l => l.loader === "babel-loader");
      if (loader) {
        loader.options.plugins.push(plugin);
      }
    }
  });

  return config;
}

module.exports = async ({ config }) => {
  // for antd
  config = injectBabelPlugin(
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
      },
    ],
    config
  );

  config.module.rules.push({
    test: /\.less$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader" },
      {
        loader: "less-loader",
        options: {
          modifyVars: antdTheme,
          javascriptEnabled: true,
        },
      },
    ],
  });

  return config;
};
