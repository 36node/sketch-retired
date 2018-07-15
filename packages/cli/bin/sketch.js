#!/usr/bin/env node

var pkg = require("../package.json");
var program = require("commander");

program
  .version(pkg.version)
  .command("init [dest]", "init a package in dest dir")
  .command("update [dest]", "update a package in dest dir")
  .parse(process.argv);
