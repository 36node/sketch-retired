import mongoose from "mongoose";
import helper from "@36node/mongoose-helper";

export const petSchema = new mongoose.Schema(
  {
    name: String,
    tag: String,
    owner: String,
    category: { type: String, enum: ["CAT", "DOG"] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

class Pet {
  /** @type {string} */
  name;
  /** @type {string} */
  tag;
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
