import mongoose, { Schema, ObjectId } from "mongoose";

const postSchema = new Schema({
  postNumber: Number,
  title: String,
  author: Schema.Types.ObjectId,
  body: String,
  writeAt: Date,
  meta: {
    view: Number,
    likes: Number,
  },
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
