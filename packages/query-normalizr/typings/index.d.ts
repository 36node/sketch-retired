import Koa from "koa";
import mongoose from "mongoose";

declare module "@36node/query-normalizr" {
  export function toMongooseQuery(options: object): mongoose.ListOptions;
}
