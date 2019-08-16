const program = require("commander");

const { helpers } = require("../dist");

program
  .option("-a, --api-key <apiKey>", "Config api key of postman")
  .parse(process.argv);

const stdout = console.log.bind(console);

function config(opts) {
  const config = {};
  let empty = true;
  for (let k in opts) {
    if (opts[k]) {
      empty = false;
      config[k] = opts[k];
    }
  }

  if (empty) {
    stdout(JSON.stringify(helpers.getConfig(), null, 2));
  } else {
    helpers.writeConfig(config);
  }

  process.exit(0);
}

config(program.opts());
