import mongooseHidden from "mongoose-hidden";

/**
 *
 * @param {import('mongoose').Schema} schema
 * @param {object} options
 */
export function helper(schema, options = {}) {
  const {
    createBy = true,
    updateBy = true,
    softDelete = true,
    timestamps = true,
  } = options;

  // soft delete
  if (softDelete) {
    schema.add({ deleted: { type: Boolean, default: false, index: true } });
    schema.add({ deleteBy: { type: String } });
    schema.add({ deletedAt: { type: Date } });
  }

  if (createBy) {
    schema.add({ createBy: { type: String } });
  }

  if (updateBy) {
    schema.add({ updateBy: { type: String } });
  }

  if (timestamps) {
    schema.set("timestamps", {
      createdAt: "createAt",
      updatedAt: "updateAt",
    });
  }

  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });

  schema.loadClass(Base);

  // hidden _id in toJSON and toObject
  schema.plugin(mongooseHidden(), {
    hidden: { _id: true, deleted: true },
  });
}

class Base {
  /**
   * Get by id
   * @param {string} id - The objectId of model.
   * @param {string?} populate - The objectId of model.
   * @returns {Promise<this>}
   */
  static get(id, populate = "") {
    return this.findById(id)
      .populate(populate)
      .exec();
  }

  /**
   * Soft delete document by id
   * @param id id of document
   * @returns {Promise<this>}
   */
  static softDelete(id) {
    return this.findByIdAndUpdate(
      id,
      { deletedAt: new Date(), deleted: true },
      { new: true }
    ).exec();
  }

  /**
   * Update or create object with given id
   * @param {*} id id of doc
   * @param {*} update body tobe updated
   * @returns {Promise<this>}
   */
  static upsert(id, update) {
    return this.findByIdAndUpdate(id, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }).exec();
  }

  /**
   * List documents
   * @param {Object} [conditions] - query condition.
   * @param {object} [conditions.filter] - mongo query.
   * @param {number} [conditions.lean] - return pure json.
   * @param {number} [conditions.limit] - limit number of docs to be returned.
   * @param {number} [conditions.offset] - number of docs to be skipped.
   * @param {string} [conditions.populate] - populate some reference fields.
   * @param {string} [conditions.select] - select fileds.
   * @param {string} [conditions.sort] - sort by.
   * @returns {Promise<Array<this>>}
   */
  static list({
    filter = {},
    lean = false,
    limit = 100,
    offset = 0,
    populate = "",
    select,
    sort = "-updateAt",
    //TODO: support grouup
  } = {}) {
    // default query not deleted docs
    if (!filter.deleted) filter.deleted = false;
    return this.find(filter)
      .sort(sort)
      .skip(Number(offset))
      .limit(Number(limit))
      .populate(populate)
      .select(select)
      .lean(lean)
      .exec();
  }

  /**
   * Count documents.
   * @param {object} filter - mongo query.
   * @returns {Promise<number>}
   */
  static count(filter = {}) {
    if (!filter.deleted) filter.deleted = false;
    return this.countDocuments(filter).exec();
  }

  /**
   * Soft delete.
   *
   * @returns {Promise<this>}
   */
  softDelete() {
    return this.set({
      deletedAt: new Date(),
      deleted: true,
    }).save();
  }

  /**
   * Get document back after soft removed.
   *
   * @returns {Promise<this>}
   */
  restore() {
    return this.set({
      deletedAt: undefined,
      deleted: undefined,
    }).save();
  }
}
