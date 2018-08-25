import path from "path";

import Koa2 from "koa";
import body from "koa-body";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import logger from "koa-logger";
import jwt from "koa-jwt";
import Router from "koa-tree-router";
import send from "koa-send";

import petsService from "./services/pet";

const app = new Koa2();
const router = new Router();
// const env = process.env.NODE_ENV || "development";

router.get("/openapi.yml", async ctx => {
  await send(ctx, "src/api/openapi.yml");
});

// register services
petsService.bind(router);

app
  .use(logger())
  .use(helmet())
  .use(jwt({ secret: "shared-secret" }).unless({ path: "/openapi.yml" }))
  .use(cors({ exposeHeaders: "*" }))
  .use(body())
  .use(router.routes());

app.listen(9527, () => {
  console.log("Server started on port 9527");
});

export default app;
