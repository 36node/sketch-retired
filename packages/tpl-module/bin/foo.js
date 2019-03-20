#!/usr/bin/env node

const program = require("commander");

const { foo } = require("../dist");
const pkg = require("../package.json");

program
  .version(pkg.version)
  .option("-f, --toFile <name>", "to log file")
  .parse(process.argv);

foo(program.toFile);
