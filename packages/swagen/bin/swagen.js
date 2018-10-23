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
    throw "error: swagger file not given!";
  }
  const dest = folder || ".";
  const target = path.resolve(process.cwd(), dest);
  const swaggerFile = is.URL(swagger) ? swagger : path.resolve(process.cwd(), swagger);
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
  .command("koa")
  .description("Generate code for koa server api")
  .option("-s, --swagger <file>", "swagger file path or url")
  .option("-f, --folder [folder]", "generate code to folder")
  .action(p => {
    try {
      generators["koa"](parseOpts(p.opts()));
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("sdk")
  .description("Generate code for client sdk")
  .option("-s, --swagger <file>", "swagger file path or url")
  .option("-f, --folder [folder]", "generate code to folder")
  .option("-n, --named [named]", "what name")
  .action(p => {
    try {
      generators["sdk"](parseOpts(p.opts()));
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("postman")
  .description("Transform openapi file to postman collection file")
  .option("-s, --swagger <file>", "swagger file path or url")
  .option("-f, --folder [folder]", "generate code to folder")
  .option("-n, --named [named]", "what name")
  .action(p => {
    try {
      generators["postman"](parseOpts(p.opts()));
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);
