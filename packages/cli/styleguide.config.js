const { override, addBabelPlugin, addLessLoader } = require("customize-cra");
const importCwd = require("import-cwd");
const antdTheme = importCwd.silent("./antd.theme") || {};
const path = require("path");

const webpackConfig = override(
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
  })
)(require("react-scripts/config/webpack.config")(process.env.NODE_ENV));

module.exports = {
  webpackConfig,
  skipComponentsWithoutExample: true,
  components: path.join(process.cwd(), "src/components/**/*.js"),
};
