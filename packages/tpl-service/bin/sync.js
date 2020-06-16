#!/usr/bin/env node --harmony -r esm

import Debug from "debug";
import mongoose from "mongoose";

import { config, jobs, logger } from "../src";

const debug = Debug("store:sync");
const { MONGODB_CONNECTION } = config;

/**
 * connect to mongodb
 */
mongoose.connect(MONGODB_CONNECTION, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  auto_reconnect: true,
  reconnectInterval: 30 * 1000,
  reconnectTries: 1000,
  keepAlive: true,
  connectTimeoutMS: 30 * 1000,
});

mongoose.connection.on("open", async () => {
  debug("mongodb connected");
});

mongoose.connection.on("error", () => {
  debug("mongodb connection error");
  logger.error("mongodb connection error");
});

jobs.createJob().then(pet => logger.info("pet created successfully", pet));
