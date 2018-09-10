import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  birthday: Date,
  type: { type: String, enum: ["CAT", "DOG"] },
});

export default mongoose.model("Pet", petSchema);
