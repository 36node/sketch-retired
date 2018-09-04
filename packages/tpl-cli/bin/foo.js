#!/usr/bin/env node

var program = require("commander");

var pkg = require("../package.json");
var foo = require("../dist");

program
  .version(pkg.version)
  .option("-f, --toFile <name>", "to log file")
  .parse(process.argv);

foo(program.toFile);
