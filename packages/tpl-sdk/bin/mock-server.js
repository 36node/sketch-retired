#!/usr/bin/env node

const express = require("express");

const mockServer = require("@36node/mock-server");

const mock = require("../mock");

const { db = {}, rewrites = {}, routers = [], aggregations = {} } = mock({
  count: 100,
});

const app = express().set("json spaces", 2);

mockServer(app, { db, rewrites, routers, aggregations });

app.listen(3000, () => {
  console.log("Mock Server is running on port 3000");
});
