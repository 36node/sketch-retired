// @ts-check
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
import health from "@36node/koa-health";
import openapi from "@36node/koa-openapi";

import logger from "./lib/log";
import { BASE, NODE_ENV } from "./config";
import { petService } from "./services";
import pkg from "../package.json";
import { errHandler } from "./middlewares";

const app = new Koa2();
const router = new Router({ prefix: BASE });
const publicKey = fs.readFileSync(path.join(__dirname, "../ssl/rsa_jwt.pub"));

/**
 * register services
 */
petService.bind(router);

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
  .use(errHandler())
  .use(helmet())
  .use(cors({ exposeHeaders: ["Link", "X-Total-Count"] }))
  .use(health({ url: `${BASE}/health`, version: pkg.version }))
  .use(
    openapi({
      url: `${BASE}/openapi.yml`,
      file: path.join(__dirname, "../openapi.yml"),
    })
  )
  .use(jwt({ secret: publicKey, key: "jwt" }))
  .use(body())
  .use(compress({ threshold: 2048 }))
  .use(router.routes());

export default app;
