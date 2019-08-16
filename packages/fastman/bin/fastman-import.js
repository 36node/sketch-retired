const program = require("commander");
const jsonfile = require("jsonfile");

const { helpers, apis } = require("../dist");

program.parse(process.argv);

/**
 *  import collection file
 * @param {string} file collection file path
 */
async function importing(file) {
  await helpers.checkApiKey();

  console.log(`importing ${file} ...`);
  if (typeof file === "undefined") {
    console.error("collection file not given!");
    process.exit(-1);
  }

  const collection = jsonfile.readFileSync(file);
  const collections = await apis.listCollections();
  const { info = {} } = collection;
  const found = collections.find(c => c.name === info.name);

  if (found) {
    console.error(
      `Collection ${
        info.name
      } is existed, please use "fastman delete [collectionId]" first.`
    );
    process.exit(-1);
  }

  await apis.createCollection(collection);
  console.log(`Collection ${info.name} created.`);
}

const postmanFile = program.args[0] || "postman.json";

importing(postmanFile).catch(err => {
  console.error(err);
  process.exit(-1);
});
