#!/usr/bin/env node

const program = require("commander");
const path = require("path");

const pkg = require("../package.json");
const { koa, sdk, postman, mock } = require("../dist");

program.version(pkg.version);

const templatePath = path.join(__dirname, "../templates");

program
  .command("koa [yamlFile] [dist]")
  .description("Generate code for koa server api")
  .action((yamlFile, dist) => {
    try {
      koa({ yamlFile, dist, templatePath });
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("sdk [yamlFile] [dist] [name]")
  .description("Generate code for client sdk")
  .action((yamlFile, dist, name) => {
    try {
      sdk({ yamlFile, dist, templatePath });
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("postman [yamlFile] [targetFile]")
  .description("Transform openapi file to postman collection file")
  .action((yamlFile, targetFile) => {
    try {
      postman({ yamlFile, targetFile, templatePath });
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
      mock({ yamlFile, dist, count });
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);
