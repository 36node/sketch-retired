const program = require("commander");
const spawn = require("cross-spawn");

const { getPackage } = require("../dist");

program.option("--noPretty", "make the json log pretty").parse(process.argv);

let command;
let args = [];

const pkg = getPackage();
const template = pkg.template || "module";
const entry = program.args[0] || "bin/server.js";

switch (template) {
  case "cra":
  case "cra-redux":
    command = "react-app-rewired";
    args = ["start"];
    break;
  case "tcp":
  case "service":
    command = "sh";
    args = [
      "-c",
      `nodemon --harmony -r esm ${entry}${
        !program.noPretty
          ? " | pino-pretty -i hostname,pid -t 'SYS:yyyy-mm-dd HH:MM:ss'}"
          : ""
      }`,
    ];
    break;
  default:
    throw new Error(`start ${template} not supported`);
}

console.log(`spawn ${command} ${args.join(" ")}`);
const result = spawn.sync(command, args, { stdio: "inherit" });

if (result.status !== 0) {
  throw new Error(`spawn ${command} ${args.join(" ")} failed`);
}
