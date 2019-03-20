const program = require("commander");
const spawn = require("cross-spawn");

const { getPackage } = require("../dist");

program
  .option("--external", "skip bundle external packages")
  .parse(process.argv);

let command;
let args = ["build"];

const pkg = getPackage(process.cwd());
const template = pkg.template || "module";

switch (template.toLowerCase()) {
  case "cra":
  case "cra-redux":
    command = "react-app-rewired";
    break;
  case "tcp":
  case "service":
    command = "microbundle";
    args.push("--format", "cjs");
    break;
  case "cli":
    command = "microbundle";
    args.push("--format", "cjs");
    break;
  case "module":
  case "sdk":
    command = "microbundle";
    args.push("--format", "cjs,es");
    break;
  default:
    throw new Error(`template ${template} not supported`);
}

args.push(...process.argv.slice(2));
console.log(`spawn ${command} ${args.join(" ")}`);

const result = spawn.sync(command, args, { stdio: "inherit" });
if (result.status !== 0) {
  throw new Error(
    `spawn ${command} ${args.join(" ")} failed ${result.status}.`
  );
}
