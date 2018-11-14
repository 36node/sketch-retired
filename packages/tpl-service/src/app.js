import fs from "fs";
import path from "path";

import Koa2 from "koa";
import body from "koa-body";
import compress from "koa-compress";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import logger from "koa-logger";
import jwt from "koa-jwt";
import mongoose from "mongoose";
import Router from "koa-tree-router";

import { BASE, MONGODB_CONNECTION } from "./config";
import petsService from "./services/pet";

const app = new Koa2();
const router = new Router({ prefix: BASE });
const publicKey = fs.readFileSync(path.join(__dirname, "../ssl/rsa_jwt.pub"));

/**
 * connect to mongodb
 */

mongoose.Promise = Promise;
mongoose.connect(
  MONGODB_CONNECTION,
  { useNewUrlParser: true }
);
mongoose.connection.on("error", console.error.bind(console, "数据库连接错误"));

/**
 * register services
 */

petsService.bind(router);

/**
 * spec openapi.yml
 */

router.get("/openapi.yml", ctx => {
  ctx.type = "text/yaml";
  ctx.body = fs.createReadStream(path.join(__dirname, "../openapi.yml"));
});

/**
 * application
 */

app
  .use(logger())
  .use(helmet())
  .use(cors({ exposeHeaders: "*" }))
  .use(jwt({ secret: publicKey }).unless({ path: `${BASE}/openapi.yml` }))
  .use(body())
  .use(compress({ threshold: 2048 }))
  .use(router.routes());

export default app;
