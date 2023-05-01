import mongoose, { Schema, ObjectId } from "mongoose";

const postSchema = new Schema({
  postNumber: Number,
  title: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  body: String,
  writeAt: Date,
  category: String,
  boardId: String,
  meta: {
    view: Number,
    likes: Number,
  },
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
