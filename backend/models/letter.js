import mongoose from "mongoose";

/**
 * Task Schema for MongoDB
 */
const letterSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    title: String,
    content: String,
    texture: String,
    tags: String,
  },
  {
    collection: "letter",
  }
);

export default mongoose.model("letter", letterSchema);