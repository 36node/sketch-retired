const { terser } = require("rollup-plugin-terser");
const alias = require("rollup-plugin-alias");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");

const babel = require("rollup-plugin-babel");
const replace = require("rollup-plugin-replace");

const paths = require("./paths");

const pkg = require(paths.modulePackageJson);

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});

const createConfig = ({ input, output, env, min = false }) => ({
  input,
  output,
  external: deps.concat(peerDeps),
  treeshake: {
    propertyReadSideEffects: false,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
    min &&
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    env &&
      replace({
        "process.env.NODE_ENV": JSON.stringify(env),
        "process.env.BABEL_ENV": JSON.stringify(env),
      }),
  ].filter(Boolean),
  onwarn(warning, warn) {
    warn(warning);
  },
});

const productionBase = {
  env: "production",
  min: true,
};

const configs = [
  createConfig({
    ...productionBase,
    input: paths.moduleIndexJs,
    output: {
      file: "dist/index.esm.js",
      format: "esm",
    },
  }),
  createConfig({
    ...productionBase,
    input: paths.moduleIndexJs,
    output: {
      file: "dist/index.cjs.js",
      format: "cjs",
    },
  }),
];

// console.log(configs);

module.exports = configs;
