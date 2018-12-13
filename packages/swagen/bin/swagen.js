#!/usr/bin/env node

var program = require("commander");
var path = require("path");

var pkg = require("../package.json");
var genreatorModule = require("../dist").default;

// parse generators from module
var generators = {};
Object.keys(genreatorModule)
  .filter(k => typeof genreatorModule[k].default === "function")
  .forEach(k => (generators[k] = genreatorModule[k].default));

program.version(pkg.version);

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

program
  .command("mock [yamlFile] [dist]")
  .option(
    "-c, --count [count]",
    "Add count of mock data to generate, default is 10"
  )
  .description("Transform openapi file to json-server data file")
  .action((yamlFile, dist, { count }) => {
    try {
      generators["mock"]({ yamlFile, dist, count });
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);
