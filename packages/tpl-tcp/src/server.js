import { app, config } from "./index";

const { PORT } = config;

app.listen(PORT, () =>
  console.info(`[${process.env.NODE_ENV}] tcp server start on ${PORT} 🚀`)
);
