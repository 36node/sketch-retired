#!/usr/bin/env node

const { app, PORT } = require("../dist");

app.listen(PORT, () => console.info(`Http server started at port ${PORT} 🚀`));
