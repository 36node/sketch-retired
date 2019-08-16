const program = require("commander");
const jsonfile = require("jsonfile");

const { helpers, apis } = require("../dist");

program.parse(process.argv);

const stdout = console.log.bind(console);
const stderr = console.error.bind(console);

/**
 *  import collection file
 * @param {string} file collection file path
 */
async function importing(file) {
  await helpers.checkApiKey();

  if (typeof file === "undefined") {
    stderr("collection file not given!");
    process.exit(1);
  }

  const collection = jsonfile.readFileSync(file);
  const collections = await apis.listCollections();
  const { info = {} } = collection;
  const found = collections.find(c => c.name === info.name);

  if (found) {
    await apis.updateCollection(found.id, collection);
    stdout("updated collection", info.name);
  } else {
    await apis.createCollection(collection);
    stdout("created collection", info.name);
  }
}

importing(program.file).catch(err => {
  stderr(err);
  process.exit(1);
});
