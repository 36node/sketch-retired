module.exports = {
  extends: ["react-app", "prettier", "prettier/react"],
  plugins: ["prettier"],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },

  parser: "babel-eslint",

  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },

  rules: {
    "prettier/prettier": "error",
    "jsx-a11y/href-no-hash": [0]
  }
};
