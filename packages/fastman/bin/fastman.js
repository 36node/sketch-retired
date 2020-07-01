#!/usr/bin/env node

const program = require("commander");

const pkg = require("../package.json");

program
  .version(pkg.version)
  .command("config", "config fastman, like postman api key eg..")
  .command("ls", "list collections exist in postman")
  .command("delete [uid]", "delete a collection by uid")
  .command("import [file]", "import a collection file to postman")
  .command(
    "export [uid] [filepath]",
    "export collection file with name, saved in filepath(default is ./postman_collection.json)"
  )
  .parse(process.argv);
