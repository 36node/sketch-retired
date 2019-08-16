const program = require("commander");

const { apis } = require("../dist");

program.parse(process.argv);

apis
  .deleteCollection(program.collectionId)
  .then(result => {
    console.log(`Delete ${program.collectionId} Successfully.`);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
