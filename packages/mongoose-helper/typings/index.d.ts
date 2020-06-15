/// <reference types="mongoose" />

declare module "mongoose" {
  interface ListOptions {
    filter: object;
    lean: boolean;
    limit: number;
    offset: number;
    populate: string | [string];
    select: string | [string];
    sort: string | [string];
    group: string | [string];
  }

  interface Model<T extends Document>
    extends NodeJS.EventEmitter,
      ModelProperties {
    /**
     * Get one document by id.
     *
     * @param id id of document
     * @param populate which fields want to populate
     */
    get(id: string, populate?: string): Promise<T>;

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
    list(opt?: ListOptions): Promise<Array<T>>;

    /**
     * Count documents
     *
     * @param filter mongo filter
     */
    count(filter?: object): Promise<number>;

    /**
     * Soft delete document by id
     *
     * @param id id of document
     */
    delete(id: string): Promise<this>;
  }

  interface Document
    extends MongooseDocument,
      NodeJS.EventEmitter,
      ModelProperties {
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
  var _: (schema: mongoose.Schema, options?: object) => void;
  export = _;
}
