import { getApiKey } from "../helpers";
import { listCollections } from "../postman-api";

const stdout = console.log.bind(console);
const stderr = console.error.bind(console);

export default function ls() {
  const apiKey = getApiKey();

  if (!apiKey) {
    stderr("Error: api key not config, please run:");
    stderr();
    stderr("fastman config -a <your-api-key>");
    process.exit(1);
  }

  listCollections()
    .then(collections => {
      for (let c of collections) {
        stdout(c.id, c.name);
      }
    })
    .catch(error => {
      stderr("Error", error);
      process.exit(1);
    });
}
