import * as Models from "../src/models";
import mongoose from "mongoose";
import jsf from "json-schema-faker";
import pickBy from "lodash/pickBy";
import { MONGODB_CONNECTION } from "../src/config";

require("mongoose-schema-jsonschema")(mongoose);

mongoose.Promise = Promise;
mongoose.connect(MONGODB_CONNECTION);
mongoose.connection.on("error", console.error.bind(console, "数据库连接错误"));

const mockCount = 100;

async function genModelMock(model) {
  const schema = model.jsonSchema();

  // 去掉一些自动生成的字段
  schema.required = Object.keys(
    pickBy(schema.properties, (value, key) => {
      return !["_id", "deleted", "deletedAt", "updatedAt", "createdAt", "__v", "id"].includes(key);
    })
  );

  for (let i = 0; i < mockCount; i++) {
    const ret = await jsf.resolve(schema);
    await model.create(ret);
  }
}

async function main() {
  for (let key of Object.keys(Models)) {
    if (key !== "default") {
      await genModelMock(Models[key]);
    }
  }
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
