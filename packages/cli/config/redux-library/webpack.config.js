process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const {
  override,
  addBabelPlugin,
  useEslintRc,
  addWebpackPlugin,
  addWebpackExternals,
} = require("customize-cra");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const craConfigFactory = require("react-scripts/config/webpack.config.js");
const modulePaths = require("./paths");

const craConfig = craConfigFactory("production");

const filterWarningsPlugin = new FilterWarningsPlugin({
  exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
});

const overrideEntry = config => {
  config.entry = [modulePaths.moduleIndexJs];
  return config;
};

const deletePlugns = config => {
  delete config.plugins;
  return config;
};

const overrideOutput = config => {
  config.output = {
    path: modulePaths.moduleDist,
    filename: "index.js",
    library: "",
    libraryTarget: "umd",
  };

  delete config.optimization;

  return config;
};

const overwriteConfig = override(
  overrideEntry,
  overrideOutput,
  // for eslint
  useEslintRc(),
  // for lodash
  addBabelPlugin(["lodash"]),
  addWebpackExternals({
    "redux-saga": {
      commonjs: "redux-saga",
      commonjs2: "redux-saga",
      amd: "redux-saga",
      umd: "redux-saga",
    },
    normalizr: {
      commonjs: "normalizr",
      commonjs2: "normalizr",
      amd: "normalizr",
      umd: "normalizr",
    },
    reselect: {
      commonjs: "reselect",
      commonjs2: "reselect",
      amd: "reselect",
      umd: "reselect",
    },
  }),
  addWebpackPlugin(filterWarningsPlugin),
  deletePlugns
);

const overrided = overwriteConfig(craConfig);

// console.log(JSON.stringify(overrided, null, 2));

module.exports = overrided;
