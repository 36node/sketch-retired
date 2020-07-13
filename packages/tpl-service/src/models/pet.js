import mongoose from "mongoose";
import { helper, defaultOptions } from "@36node/mongoose-helper";

export const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: mongoose.SchemaTypes.ObjectId,
    age: Number,
    tag: { type: String, enum: ["CAT", "DOG"] },
    birthAt: String,
  },
  defaultOptions
);

/**
 * @typedef {Object} PetDoc
 * @property {string} name - 名称
 * @property {"CAT"|"DOG"} [tag] - 标签
 * @property {number} [age] - 年龄
 * @property {mongoose.Schema.Types.ObjectId} [owner] - 拥有者
 * @property {string} [birthAt] - 出生日期
 * @property {number} [grade] - 年级
 * @property {string} [other2] - other2
 */

/**
 * @typedef {mongoose.Document & PetDoc & Pet} PetDocument
 */

/**
 * TODO: 弥补遗憾
 *
 * 遗憾: Pet内部无法实现语法提示
 */
class Pet {
  /**
   * static function example
   *
   * @returns {Promise<Array<PetDocument>>}
   */
  static foo() {
    return null;
  }

  /**
   * @param {PetCreateDoc} doc - some param
   */
  method(doc) {}
}

petSchema.pre("save", async function() {
  // console.log("pre save *********************");
});

petSchema.loadClass(Pet);
petSchema.plugin(helper);

/**
 * @typedef {mongoose.Model<PetDocument, Pet>} PetModel
 */

/**
 * @type {PetModel & typeof Pet}
 */
const Model = mongoose.model("Pet", petSchema);

export default Model;
