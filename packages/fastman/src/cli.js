#!/usr/bin/env node

import program from "commander";
import fastmanLs from "./cli/fastman-ls";
import fastmanConfig from "./cli/fastman-config";
import fastmanImport from "./cli/fastman-import";
import fastmanExport from "./cli/fastman-export";
const pkg = require("../package.json"); // microbundle not support json

program.version(pkg.version);

program
  .command("config")
  .description("config fastman, like postman api key eg..")
  .option("-a, --api-key <apiKey>", "Config api key of postman")
  .action(p => fastmanConfig(p.opts()));

program
  .command("ls")
  .description("list collections exist in postman")
  .action(fastmanLs);

program
  .command("import [file]")
  .description("import a collection file to postman")
  .action(fastmanImport);

program
  .command("export [name] [dist]")
  .description("export collection file with name, saved in dist")
  .action(fastmanExport);

program.parse(process.argv);
