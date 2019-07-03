#!/usr/bin/env node

const mockServer = require("@36node/mock-server");

const mock = require("../mock");

const { db = {}, rewrites = {}, routers = [], aggregations = {} } = mock({
  count: 100,
});

const app = mockServer({ db, rewrites, routers, aggregations });

app.listen(3000, () => {
  console.log("Mock Server is running on port 3000");
});
