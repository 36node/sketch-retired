#!/usr/bin/env node

var program = require("commander");
var path = require("path");
const is = require("../dist/util/is");

var pkg = require("../package.json");
var genreatorModule = require("../dist").default;

// parse generators from module
var generators = {};
Object.keys(genreatorModule)
  .filter(k => typeof genreatorModule[k].default === "function")
  .forEach(k => (generators[k] = genreatorModule[k].default));

program.version(pkg.version);

function parseOpts(opts = {}) {
  const { folder, named, swagger } = opts;
  if (!swagger) {
    throw new Error("error: swagger file not given!");
  }
  const dest = folder || ".";
  const target = path.resolve(process.cwd(), dest);
  const swaggerFile = is.URL(swagger)
    ? swagger
    : path.resolve(process.cwd(), swagger);
  const name =
    named ||
    path
      .basename(swagger)
      .split(".")
      .slice(0, -1)
      .join(".");
  return { target, swaggerFile, name };
}

program
  .command("koa [yamlFile] [dist]")
  .description("Generate code for koa server api")
  .action((yamlFile, dist) => {
    try {
      generators["koa"]({ yamlFile, dist });
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("sdk [yamlFile] [dist] [name]")
  .description("Generate code for client sdk")
  .action((yamlFile, dist, name) => {
    try {
      const sdkName = name || path.basename(yamlFile).split(".")[0];
      generators["sdk"]({ yamlFile, name: sdkName, dist });
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("postman [yamlFile] [targetFile]")
  .description("Transform openapi file to postman collection file")
  .action((yamlFile, targetFile) => {
    try {
      generators["postman"]({ yamlFile, targetFile });
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);
