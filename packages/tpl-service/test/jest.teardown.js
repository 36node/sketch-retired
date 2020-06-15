import mongoose from "mongoose";

export default async () => {
  /**
   * mongo teardown
   */
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    console.log(`[${process.env.NODE_ENV}] mongo closed`);
  }

  /**
   * app teardown
   */
  if (global.__SERVER__) {
    console.log(`[${process.env.NODE_ENV}] http server closed`);
    await global.__SERVER__.close();
  }
};
