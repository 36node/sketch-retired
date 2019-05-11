import fs from "fs";
import path from "path";

import Koa2 from "koa";
import body from "koa-body";
import compress from "koa-compress";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import koaLogger from "koa-logger";
import koaPinoLogger from "koa-pino-logger";
import jwt from "koa-jwt";
import Router from "koa-tree-router";
import { queryNormalizr } from "@36node/query-normalizr";

import logger from "./lib/logger";
import { BASE, NODE_ENV } from "./lib/config";
import openapi from "./middleware/openapi";
import petsService from "./services/pet";

const app = new Koa2();
const router = new Router({ prefix: BASE });
const publicKey = fs.readFileSync(path.join(__dirname, "../ssl/rsa_jwt.pub"));
const openapiFile = fs.createReadStream(path.join(__dirname, "../openapi.yml"));

/**
 * register services
 */
petsService.bind(router);

/**
 * logger
 */
if (NODE_ENV !== "production") {
  // simple log under development
  app.use(koaLogger());
} else {
  app.use(koaPinoLogger({ logger }));
}

/**
 * application
 */
app
  .use(helmet())
  .use(openapi(`${BASE}/openapi.yml`, openapiFile))
  .use(cors({ exposeHeaders: ["Link", "X-Total-Count"] }))
  .use(jwt({ secret: publicKey }))
  .use(body())
  .use(queryNormalizr())
  .use(compress({ threshold: 2048 }))
  .use(router.routes());

export default app;
