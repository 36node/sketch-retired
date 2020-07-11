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
 * @property {"CAT"|"DOG"=} category - 类别
 * @property {mongoose.Schema.Types.ObjectId=} owner - 拥有者
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
   * @param {string} a - some param
   */
  method(a) {
    this.tag = a;
  }
}

petSchema.pre("save", async function() {
  console.log("pre save *********************");
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
