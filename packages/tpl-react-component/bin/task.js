#!/usr/bin/env node

const program = require("commander");

const pkg = require("../package.json");

program
  .version(pkg.version)
  .option("-f, --toFile <name>", "to log file")
  .parse(process.argv);

console.log("some task");
