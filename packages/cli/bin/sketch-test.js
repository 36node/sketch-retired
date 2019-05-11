const program = require("commander");
const spawn = require("cross-spawn");

const { getPackage } = require("../dist");

program
  .option("-c, --config", "specify config file")
  .option("--testMatch", "test glob match")
  .option("--coverage", "test with coverage")
  .option("--env", "which env for test")
  .parse(process.argv);

let command;
let args = ["test", ...process.argv.slice(2)];

const pkg = getPackage();
const template = pkg.template || "module";

switch (template) {
  case "cli":
  case "cra":
  case "cra-redux":
  case "module":
  case "react-component":
  case "sdk":
    command = "react-app-rewired";
    break;
  case "tcp":
  case "service":
    // makesure same as create-react-app
    if (!process.env.CI) {
      args.push("--watch");
    }
    command = "jest";
    break;
  default:
    throw new Error(`test ${template} not supported`);
}

console.log(`run: ${command} ${args.join(" ")}`);
const result = spawn.sync(command, args, { stdio: "inherit" });

if (result.status !== 0) {
  throw new Error(`spawn ${command} ${args.join(" ")} failed`);
}
