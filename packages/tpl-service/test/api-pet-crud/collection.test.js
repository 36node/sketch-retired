import { handleResult } from "jest-runner-newman/handle-result";
import newman from "newman";

const collection = require.resolve("./collection.json");
const environment = require.resolve("../env.json");

export default newman.run(
  {
    collection,
    environment,
    reporters: ["cli"],
  },
  (err, result) => {
    handleResult(err, result);
  }
);
