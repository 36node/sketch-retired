#!/usr/bin/env babel-node

import mongoose from "mongoose";
import jsf from "json-schema-faker";
import pickBy from "lodash/pickBy";
import { MONGODB_CONNECTION } from "../src/config";
import requireDirectory from "require-directory";
import jsonSchema from "mongoose-schema-jsonschema";

mongoose.Promise = Promise;
mongoose.connect(
  MONGODB_CONNECTION,
  { useNewUrlParser: true }
);
mongoose.connection.on("error", console.error.bind(console, "数据库连接错误"));
jsonSchema(mongoose);

const mockCount = 100;
const Models = requireDirectory(module, "../src/models");

async function genModelMock(model) {
  const schema = model.jsonSchema();

  // 去掉一些自动生成的字段
  schema.required = Object.keys(
    pickBy(schema.properties, (value, key) => {
      return ![
        "_id",
        "deleted",
        "deletedAt",
        "updatedAt",
        "createdAt",
        "__v",
        "id",
      ].includes(key);
    })
  );

  for (let i = 0; i < mockCount; i++) {
    const ret = await jsf.resolve(schema);
    await model.create(ret);
  }
}

async function main() {
  for (let key of Object.keys(Models)) {
    if (Models[key].default && Models[key].default.modelName) {
      await genModelMock(Models[key].default);
    }
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(-1);
  });
