module.exports = {
  displayName: "integration",
  testMatch: ["<rootDir>/**/*.test.js"],
  globalSetup: "./jest.setup.js",
  globalTeardown: "./jest.teardown.js",
};
