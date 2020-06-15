import mongoose from "mongoose";

import { app, config } from "../src";

const { PORT, MONGODB_CONNECTION } = config;

export default async () => {
  /**
   * setup mongo
   */
  await mongoose.connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  /**
   * setup server
   */
  global.__SERVER__ = app.listen(PORT, () =>
    console.log(
      `[${process.env.NODE_ENV}] http server start on port ${PORT} 🚀`
    )
  );
};
