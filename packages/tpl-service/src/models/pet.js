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
 * @typedef {mongoose.Document & PetDoc} PetDocument
 */

/**
 * TODO: 遗憾，Pet class 内部没法认出 PetDoc 的属性
 */
class Pet extends mongoose.Model {
  /**
   * static function example
   *
   * @returns {Promise<Array<PetDocument>>}
   */
  static foo() {
    return null;
  }

  /**
   * @param {number} a - some param
   */
  method(a) {
    this.age = a;
  }
}

petSchema.pre("save", async function() {
  console.log("pre save *********************");
});

petSchema.loadClass(Pet);
petSchema.plugin(helper);

/**
 * @typedef {mongoose.Model<PetDocument & Pet>} PetModel
 */

/**
 * @type {typeof Pet & PetModel}
 */
const Model = mongoose.model("Pet", petSchema);

export default Model;
