import jsonfile from "jsonfile";
import * as helpers from "../helpers";
import * as apis from "../postman-api";

const stderr = console.error.bind(console);

export default async function(name, dist) {
  helpers.checkApiKey();
  if (typeof name === "undefined") {
    stderr("collection name not given!");
    process.exit(1);
  }

  try {
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
  } catch (error) {
    stderr(error);
    process.exit(1);
  }
}
