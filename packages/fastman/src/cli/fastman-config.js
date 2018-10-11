import * as helpers from "../helpers";

const stdout = console.log.bind(console);

export default function(opts) {
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
