import { checkApiKey } from "../helpers";
import { listCollections } from "../postman-api";

const stdout = console.log.bind(console);
const stderr = console.error.bind(console);

export default async function ls() {
  try {
    await checkApiKey();
    const collections = await listCollections();
    for (let c of collections) {
      stdout(c.id, c.name);
    }
  } catch (error) {
    stderr("Error", error);
    process.exit(1);
  }
}
