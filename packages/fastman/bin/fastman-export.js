const program = require("commander");
const jsonfile = require("jsonfile");

const helpers = require("../dist");
const apis = require("../dist");

program.parse(process.argv);

const stderr = console.error.bind(console);

async function exporting(name, dist) {
  await helpers.checkApiKey();
  if (typeof name === "undefined") {
    stderr("collection name not given!");
    process.exit(1);
  }
  const collections = await apis.listCollections();
  const found = collections.find(c => c.name === name);

  if (!found) {
    stderr(`collection ${name} not found!`);
    process.exit(1);
  }

  let file = dist;
  if (typeof file === "undefined") {
    file = `./${name}.postman_collection.json`;
  }

  const collection = await apis.singleCollection(found.id);
  jsonfile.writeFileSync(file, collection, { spaces: 2 });
}

exporting(program.name, program.dist)
  .then(() => console.log("exporting success."))
  .catch(err => {
    stderr(err);
    process.exit(1);
  });
