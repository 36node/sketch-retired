import * as Models from "../src/models";
import mongoose from "mongoose";
import jsf from "json-schema-faker";

require("mongoose-schema-jsonschema")(mongoose);

async function main() {
  const schema = Models.Pet.jsonSchema();

  // const schema = {
  //   type: "object",
  //   properties: {
  //     name: { type: "string" },
  //     birthday: { type: "string", format: "date-time" },
  //   },
  //   required: ["name", "birthday"],
  // };

  const ret = await jsf.resolve(schema);
  console.log(schema);
  console.log(ret);
}

main()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(-1);
  });
