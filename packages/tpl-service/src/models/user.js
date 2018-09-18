import mongoose from "mongoose";

import { Base, createSchema } from "./lib";

export const userSchema = createSchema({
  name: String,
  email: String,
});

class Pet extends Base {
  name;
  email;
}

/**
 * output
 */
userSchema.loadClass(Pet);

/**
 * @type {typeof Pet}
 */
const Model = mongoose.model("User", userSchema);

export default Model;
