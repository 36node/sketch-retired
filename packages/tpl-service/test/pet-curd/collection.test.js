const { handleResult } = require("jest-runner-newman/handle-result");
const newman = require("newman");

const collection = require.resolve("./collection.json");
const environment = require.resolve("../env.json");

module.exports = newman.run(
  {
    collection,
    environment,
    reporters: ["cli"],
  },
  (err, result) => {
    handleResult(err, result);
  }
);
