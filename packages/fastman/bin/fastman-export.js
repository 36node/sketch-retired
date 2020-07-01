const program = require("commander");
const jsonfile = require("jsonfile");

const { helpers, apis } = require("../dist");

program.parse(process.argv);

const stderr = console.error.bind(console);

async function exporting(uid, filepath) {
  await helpers.checkApiKey();
  if (typeof uid === "undefined") {
    stderr("collection uid not given!");
    process.exit(1);
  }

  const collection = await apis.singleCollection(uid);
  jsonfile.writeFileSync(filepath, collection, { spaces: 2 });
}

const [uid = "nouid", filepath = "./postman_collection.json"] =
  program.args || [];

exporting(uid, filepath)
  .then(() => console.log("exporting success."))
  .catch(err => {
    stderr(err);
    process.exit(1);
  });
