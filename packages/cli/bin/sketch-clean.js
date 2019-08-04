const program = require("commander");
const spawn = require("cross-spawn");

const { getPackage } = require("../dist");

program.option("--some <opt>", "some option").parse(process.argv);

let command;
let args = [];

const pkg = getPackage();
const template = pkg.template || "module";

switch (template) {
  case "cra":
  case "cra-redux":
    command = "echo";
    args.push("clean cra redux template");
    break;
  case "tcp":
  case "service":
    command = "echo";
    args.push("clean service and tcp template");
    break;
  default:
    throw new Error(`start ${template} not supported`);
}

console.log(`spawn ${command} ${args.join(" ")}`);
const result = spawn.sync(command, args, { stdio: "inherit" });

if (result.status !== 0) {
  throw new Error(`spawn ${command} ${args.join(" ")} failed`);
}
