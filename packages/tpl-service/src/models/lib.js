import mongoose from "mongoose";
import mongooseHidden from "mongoose-hidden";

export function createSchema(schema) {
  const to = new mongoose.Schema(
    {
      ...schema,
      deleted: { type: Boolean, default: false }, // 是否已经删除
      deletedAt: Date, // 删除时间
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

  // hidden properties in toJSON and toObject
  to.plugin(mongooseHidden(), {
    hidden: { _id: true },
  });

  return to;
}

export class Base {
  createdAt;
  deleted;
  deletedAt;
  updatedAt;

  /**
   * Get by id
   * @param {string} id - The objectId of model.
   * @returns {Promise<*>}
   */
  static get(id, populate = "") {
    return this.findById(id)
      .populate(populate)
      .exec();
  }

  /**
   * Update or create object with given id
   *
   * @param {*} id id of doc
   * @param {*} update body tobe updated
   * @returns {Promise<*>}
   */
  static upsert(id, update) {
    // console.log(JSON.stringify(update, 0, 2));
    return this.findByIdAndUpdate(id, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }).exec();
  }

  /**
   * List objects in descending order of 'updatedAt' timestamp.
   * @param {number} offset - Number of objects to be skipped.
   * @param {number} limit - Limit number of objects to be returned.
   * @param {number} conditions - Query condition.
   * @returns {Promise<[*]>}
   */
  static list({
    offset = 0,
    limit = 50,
    sort = "-updatedAt",
    conditions,
    populate = "",
    select,
  } = {}) {
    return this.find(conditions)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate(populate)
      .select(select)
      .exec();
  }

  /**
   * Delete object by id
   *
   * @param {*} id - object id
   * @returns {Promise<?*>}
   */
  static logicalRemove(id) {
    return this.findByIdAndUpdate(id, {
      deletedAt: new Date(),
      deleted: true,
    });
  }
}
