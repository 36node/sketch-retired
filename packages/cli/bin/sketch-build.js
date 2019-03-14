const program = require("commander");
const spawn = require("cross-spawn");

program
  .option("--external", "skip bundle external packages")
  .parse(process.argv);

const target = program.args[0] || "node";

switch (target.toLowerCase()) {
  case "web":
  case "react":
  case "cra":
    const result = spawn.sync("react-app-rewired", ["build"], {
      stdio: "inherit",
    });
    if (result.status !== 0) {
      throw new Error(`spawn react-app-rewired failed`);
    }
    break;
  default:
    console.log(`build ${target} not supported`);
}
