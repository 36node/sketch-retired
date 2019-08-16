const program = require("commander");

const { apis } = require("../dist");

program.parse(process.argv);

const collectionId = program.args[0];

if (!collectionId) {
  console.error("Please provide collection id.");
  process.exit(1);
}

apis
  .deleteCollection(collectionId)
  .then(result => {
    console.log(`Delete ${collectionId} Successfully.`);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
