#!/usr/bin/env node

var program = require("commander");
var path = require("path");

var pkg = require("../package.json");
var { genKoaCode } = require("../dist");

program
  .version(pkg.version)
  .option("-t, --template <name>", "template name: koa, sdk")
  .option("-s, --swagger <file>", "swagger file")
  .option("-f, --folder [f]", "generate code to folder")
  .parse(process.argv);

const dest = program.folder || ".";
const target = path.resolve(process.cwd(), dest);
const swagger = path.resolve(process.cwd(), program.swagger);

switch (program.template) {
  case "koa":
    genKoaCode(target, swagger);
    break;
  case "sdk":
    break;
  default:
    throw new Error(`template ${program.template} not provided`);
}
