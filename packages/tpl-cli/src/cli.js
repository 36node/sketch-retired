#!/usr/bin/env node

import program from "commander";
import foo from "./index";

const pkg = require("../package.json"); // microbundle not support json

program
  .version(pkg.version)
  .option("-f, --toFile <name>", "to log file")
  .parse(process.argv);

foo(program.toFile);
