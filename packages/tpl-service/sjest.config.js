module.exports = {
  displayName: "unittest",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  preset: "@shelf/jest-mongodb",
  resolver:
    "/Users/zzs/Workspace/src/github.com/36node/sketch/node_modules/jest-pnp-resolver/index.js",
  setupFiles: [
    "/Users/zzs/Workspace/src/github.com/36node/sketch/node_modules/react-app-polyfill/jsdom.js",
  ],
  setupTestFrameworkScriptFile: undefined,
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}",
  ],
  testEnvironment: "jsdom",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$":
      "/Users/zzs/Workspace/src/github.com/36node/sketch/node_modules/react-app-rewired/scripts/utils/babelTransform.js",
    "^.+\\.css$":
      "/Users/zzs/Workspace/src/github.com/36node/sketch/node_modules/react-scripts/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
      "/Users/zzs/Workspace/src/github.com/36node/sketch/node_modules/react-scripts/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  watchPlugins: [
    "/Users/zzs/Workspace/src/github.com/36node/sketch/node_modules/jest-watch-typeahead/filename.js",
    "/Users/zzs/Workspace/src/github.com/36node/sketch/node_modules/jest-watch-typeahead/testname.js",
  ],
  rootDir:
    "/Users/zzs/Workspace/src/github.com/36node/sketch/packages/tpl-service",
};
