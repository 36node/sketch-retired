const program = require("commander");
const spawn = require("cross-spawn");

const { getPackage } = require("../dist");

program.option("--entry", "main entry file").parse(process.argv);

let command;
let args = [];

const pkg = getPackage();
const template = pkg.template || "module";
const entry = program.entry || "src/server.js";

switch (template) {
  case "cra":
  case "cra-redux":
    command = "react-app-rewired";
    args = ["start"];
    break;
  case "tcp":
  case "service":
    command = "nodemon";
    args = ["--harmony", "-r", "esm", entry];
    break;
  default:
    throw new Error(`start ${template} not supported`);
}

console.log(`spawn ${command} ${args.join(" ")}`);
const result = spawn.sync(command, args, { stdio: "inherit" });

if (result.status !== 0) {
  throw new Error(`spawn ${command} ${args.join(" ")} failed`);
}
