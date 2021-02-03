/// <reference types="mongoose" />

declare module "mongoose" {
  interface ListOptions {
    filter?: object;
    lean?: boolean;
    limit?: number;
    offset?: number;
    populate?: string | [string];
    select?: string | [string];
    sort?: string | [string];
    group?: string | [string];
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
     * @param deleteBy who delete
     */
    softDelete(id: string, deleteBy?: string): Promise<T>;
  }

  interface Document
    extends MongooseDocument,
      NodeJS.EventEmitter,
      ModelProperties {
    /**
     * Soft delete itself.
     * It will set the deleted flag.
     * @param deleteBy who delete
     */
    softDelete(deleteBy?: string): Promise<this>;
    /**
     * Restore itself.
     * It will unset the deleted flag.
     */
    restore(): Promise<this>;

    createBy?: String;
    updateBy?: String;
    deleteBy?: String;

    createAt?: Date;
    updateAt?: Date;

    deleted?: Boolean;
    deletedAt?: Date;
  }
}

declare module "@36node/mongoose-helper" {
  import mongoose = require("mongoose");

  interface HelperOptions {
    createBy?: Boolean;
    updateBy?: Boolean;
    softDelete?: Boolean;
    timestamps?: Boolean;
  }

  /**
   * Mongoose helper for 36node team.
   */
  export function helper(
    schema: mongoose.Schema,
    options?: HelperOptions
  ): void;
}
