import mongoose from "mongoose";

import { Base, createSchema } from "./lib";

export const petSchema = createSchema({
  name: String,
  tag: String,
  owner: String,
});

class Pet extends Base {
  name;
  tag;
  owner;
}

/**
 * output
 */
petSchema.loadClass(Pet);

/**
 * @type {typeof Pet}
 */
const Model = mongoose.model("Pet", petSchema);

export default Model;
