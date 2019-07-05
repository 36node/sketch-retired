const path = require("path");
const fs = require("fs");

const moduleDirectory = fs.realpathSync(process.cwd());

const resolveModule = relativePath =>
  path.resolve(moduleDirectory, relativePath);

module.exports = {
  modulePath: resolveModule("."),
  moduleDist: resolveModule("dist"),
  modulePackageJson: resolveModule("package.json"),
  moduleSrc: resolveModule("src"),
  moduleIndexJs: resolveModule("src/index.js"),
};
