#!/usr/bin/env node

var program = require("commander");
var path = require("path");
const is = require("../dist/util/is");

var pkg = require("../package.json");
var generators = require("../dist").default;

const templateNames = Object.keys(generators).join(",");

program
  .version(pkg.version)
  .option("-t, --template <template>", "template name: " + templateNames)
  .option("-s, --swagger <file>", "swagger file")
  .option("-f, --folder [folder]", "generate code to folder")
  .option("-n, --named [named]", "what name")
  .parse(process.argv);

const dest = program.folder || ".";
const target = path.resolve(process.cwd(), dest);
const swagger = is.URL(program.swagger)
  ? program.swagger
  : path.resolve(process.cwd(), program.swagger);
const name =
  program.named ||
  path
    .basename(swagger)
    .split(".")
    .slice(0, -1)
    .join(".");

if (Object.keys(generators).includes(program.template)) {
  const generator = generators[program.template].default;
  if (generator && typeof generator === "function") {
    generators[program.template].default(target, swagger, name);
  } else {
    throw new Error(`generator ${program.template} invalid!`);
  }
} else {
  throw new Error(`template ${program.template} not provided`);
}

// switch (program.template) {
//   case "koa":
//     genKoa(target, swagger);
//     break;
//   case "sdk":
//     genSDK(target, swagger, name);
//     break;
//   default:
//     throw new Error(`template ${program.template} not provided`);
// }
