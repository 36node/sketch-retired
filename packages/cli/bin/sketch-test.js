const program = require("commander");
const spawn = require("cross-spawn");

program
  .option("--testMatch", "test glob match")
  .option("--env", "which env for test")
  .parse(process.argv);

let command = "react-app-rewired";
let args = ["test", ...process.argv.slice(2)];

console.log(`run: ${command} ${args.join(" ")}`);
const result = spawn.sync(command, args, { stdio: "inherit" });

if (result.status !== 0) {
  throw new Error(`spawn ${command} ${args.join(" ")} failed`);
}
