import mongoose from "mongoose";
import helper, { defaultSchemaOptions } from "@36node/mongoose-helper";

export const petSchema = new mongoose.Schema(
  {
    name: String,
    tag: String,
    owner: String,
    age: Number,
    category: { type: String, enum: ["CAT", "DOG"] },
  },
  defaultSchemaOptions
);

class Pet {
  /** @type {string} */
  name;
  /** @type {string} */
  tag;
  /** @type {number} */
  age;
  /** @type {string} */
  owner;
  /** @type {("CAT"|"DOG")} */
  category;
}

/**
 * output
 */
petSchema.loadClass(Pet);
petSchema.plugin(helper);

/**
 * @typedef {mongoose.Document & Pet} PetDocument
 */

/**
 * @type {mongoose.Model<PetDocument>}
 */
let Model = mongoose.model("Pet", petSchema);

export default Model;
