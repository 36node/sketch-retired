const program = require("commander");
const spawn = require("cross-spawn");

program.parse(process.argv);

let command = "eslint";
let args = process.argv.slice(2);

console.log(`run: ${command} ${args.join(" ")}`);
const result = spawn.sync(command, args, { stdio: "inherit" });

if (result.status !== 0) {
  throw new Error(`spawn ${command} ${args.join(" ")} failed`);
}
