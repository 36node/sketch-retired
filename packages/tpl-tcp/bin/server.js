#!/usr/bin/env node

const { app, PORT } = require("../dist");

app.listen(PORT, () => console.info(`Tcp server started at ${PORT} 🚀`));
