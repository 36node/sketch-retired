/// <reference types="mongoose" />

declare module "mongoose" {
  interface ListOptions {
    filter: Object;
    lean: Boolean;
    limit: Number;
    offset: Number;
    populate: string;
    select: string;
    sort: string;
  }

  interface ListResult<T> {
    total: number;
    docs: Array<T>;
  }

  interface Model<T extends Document> extends NodeJS.EventEmitter, ModelProperties {
    /**
     * Get one document by id.
     *
     * @param id id of document
     * @param populate which fields want to populate
     */
    get(id: string, populate: string): Promise<T>;
    /**
     * Update or Create a document with given id
     *
     * @param id given id
     * @param update document content
     */
    upsert(id: string, update: T): Promise<T>;
    /**
     * List documents with limit and offset
     *
     * @param opt list options
     */
    list(opt: ListOptions): Promise<ListResult<T>>;
  }

  interface Document extends MongooseDocument, NodeJS.EventEmitter, ModelProperties {
    /**
     * Soft delete itself.
     * It will set the deleted flag.
     */
    delete(): Promise<this>;
    /**
     * Restore itself.
     * It will unset the deleted flag.
     */
    restore(): Promise<this>;
  }
}

declare module "@36node/mongoose-helper" {
  import mongoose = require("mongoose");

  /**
   * Mongoose helper for 36node team.
   */
  var _: (schema: mongoose.Schema, options?: Object) => void;
  export = _;
}
