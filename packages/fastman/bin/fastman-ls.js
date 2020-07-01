const program = require("commander");

const { helpers, apis } = require("../dist");

program.parse(process.argv);

const stdout = console.log.bind(console);
const stderr = console.error.bind(console);

async function ls() {
  await helpers.checkApiKey();
  const collections = await apis.listCollections();

  for (let c of collections) {
    stdout(c.uid, c.name);
  }
}

ls().catch(err => {
  stderr(err);
  process.exit(1);
});
