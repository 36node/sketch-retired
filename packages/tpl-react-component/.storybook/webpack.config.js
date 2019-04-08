module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.less$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
  });

  return config;
};
