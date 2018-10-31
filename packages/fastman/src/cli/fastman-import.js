import jsonfile from "jsonfile";
import * as helpers from "../helpers";
import * as apis from "../postman-api";

const stdout = console.log.bind(console);
const stderr = console.error.bind(console);

/**
 *  import collection file
 * @param {string} file collection file path
 */
export default async function(file) {
  try {
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
  } catch (error) {
    stderr(error);
    process.exit(1);
  }
}
