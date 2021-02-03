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
      createBy: "xxx",
      updateBy: "yyy",
    };

    const pet = await Pet.create(doc);

    expect(pet.createAt).not.toBeUndefined();
    expect(pet.updateAt).not.toBeUndefined();
    expect(pet.createBy).toBe("xxx");
    expect(pet.updateBy).toBe("yyy");

    expect(plain(pet)).toMatchObject(doc);
  });
});
