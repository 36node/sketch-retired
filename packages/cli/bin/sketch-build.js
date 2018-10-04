const chalk = require("chalk");
const program = require("commander");
const microbundle = require("microbundle");

const stdout = console.log.bind(console);
const stderr = console.error.bind(console);

function logError(err) {
  const error = err.error || err;
  const description = `${error.name ? error.name + ": " : ""}${error.message || error}`;
  const message = error.plugin ? `(${error.plugin} plugin) ${description}` : description;

  stderr(chalk.bold.red(message));

  if (error.loc) {
    stderr();
    stderr(`at ${error.loc.file}:${error.loc.line}:${error.loc.column}`);
  }

  if (error.frame) {
    stderr();
    stderr(chalk.dim(error.frame));
  } else if (err.stack) {
    const headlessStack = error.stack.replace(message, "");
    stderr(chalk.dim(headlessStack));
  }

  stderr();
}

program
  .option("-u, --umd <name>", "Specify name exposed in UMD builds")
  .option("-o, --output <folder>", "Directory to place build files into")
  .parse(process.argv);

const type = program.args[0] || "module";

const opts = {
  name: program.umd,
  output: program.output,
  format: "es,cjs,umd",
  cwd: ".",
  target: "node",
  compress: true,
  sourcemap: true,
  raw: false,
};

if (type === "module") {
  microbundle(opts)
    .then(output => {
      if (output != null) stdout(output);
      if (!opts.watch) process.exit(0);
    })
    .catch(err => {
      process.exitCode = (typeof err.code === "number" && err.code) || 1;
      logError(err);
      process.exit();
    });
}
