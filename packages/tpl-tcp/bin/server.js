#!/usr/bin/env node

const pack = process.env.NODE_ENV === "production" ? "../dist" : "../src";
const { app, config } = require(pack);
const { PORT } = config;

app.listen(PORT, () =>
  console.info(`[${process.env.NODE_ENV}] tcp server start on ${PORT} 🚀`)
);
