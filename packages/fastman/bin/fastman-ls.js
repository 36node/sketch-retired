const program = require("commander");

const { listCollections, checkApiKey } = require("../dist");

program.parse(process.argv);

const stdout = console.log.bind(console);
const stderr = console.error.bind(console);

async function ls() {
  await checkApiKey();
  const collections = await listCollections();
  for (let c of collections) {
    stdout(c.id, c.name);
  }
}

ls().catch(err => {
  stderr(err);
  process.exit(1);
});
