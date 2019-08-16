#!/usr/bin/env node

const program = require("commander");

const pkg = require("../package.json");

program
  .version(pkg.version)
  .command("config", "config fastman, like postman api key eg..")
  .command("ls", "list collections exist in postman")
  .command("delete [collectionId]", "delete a collection by id")
  .command("import [file]", "import a collection file to postman")
  .command(
    "export [name] [dist]",
    "export collection file with name, saved in dist"
  )
  .parse(process.argv);
