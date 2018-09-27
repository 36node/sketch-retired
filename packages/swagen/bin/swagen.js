#!/usr/bin/env node

var program = require("commander");
var path = require("path");

var pkg = require("../package.json");
var { genKoa, genSDK } = require("../dist");

program
  .version(pkg.version)
  .option("-t, --template <template>", "template name: koa, sdk")
  .option("-s, --swagger <file>", "swagger file")
  .option("-f, --folder [folder]", "generate code to folder")
  .option("-n, --named [named]", "what name")
  .parse(process.argv);

const dest = program.folder || ".";
const target = path.resolve(process.cwd(), dest);
const swagger = path.resolve(process.cwd(), program.swagger);
const name =
  program.named ||
  path
    .basename(swagger)
    .split(".")
    .slice(0, -1)
    .join(".");

switch (program.template) {
  case "koa":
    genKoa(target, swagger);
    break;
  case "sdk":
    genSDK(target, swagger, name);
    break;
  default:
    throw new Error(`template ${program.template} not provided`);
}
