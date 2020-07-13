import mongoose from "mongoose";

import Pet from "./pet";
import { plain } from "../lib";

describe("Pet model", () => {
  beforeAll(async () => {
    mongoose.Promise = Promise;
    mongoose.connect(global.__MONGO_URI__, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it("should insert a doc into collection", async () => {
    const doc = {
      name: "cali",
      tag: "CAT",
      owner: "5cb9a4edc48ad400120d28b0",
    };

    const pet = await Pet.create(doc);

    expect(plain(pet)).toMatchObject(doc);
  });
});
