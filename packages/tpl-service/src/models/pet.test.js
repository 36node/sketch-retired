import mongoose from "mongoose";

import Pet from "./pet";

describe("Pet model", () => {
  beforeAll(async () => {
    mongoose.Promise = Promise;
    mongoose.connect(global.__MONGO_URI__, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it("should insert a doc into collection", async () => {
    const doc = {
      name: "cali",
      tag: "cute",
      owner: "tom",
      age: 1,
      category: "CAT",
    };

    const pet = await Pet.create(doc);

    expect(pet.toJSON()).toMatchObject(doc);
  });
});
