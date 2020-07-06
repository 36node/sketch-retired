// @ts-check

import mongoose from "mongoose";
import { helper, defaultOptions } from "@36node/mongoose-helper";

export const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tag: String,
    owner: mongoose.SchemaTypes.ObjectId,
    age: Number,
    category: { type: String, enum: ["CAT", "DOG"] },
  },
  defaultOptions
);

/**
 * @typedef {Object} PetDoc
 * @property {string} name - 名称
 * @property {string=} tag - 标签
 * @property {number=} age - 年龄
 * @property {mongoose.Schema.Types.ObjectId=} owner - 拥有者
 */
export class Pet {}

petSchema.loadClass(Pet);
petSchema.plugin(helper);

/**
 * @typedef {mongoose.Document & Pet & PetDoc} PetDocument
 */

/**
 * @type {mongoose.Model<PetDocument>}
 */
const Model = mongoose.model("Pet", petSchema);

export default Model;
