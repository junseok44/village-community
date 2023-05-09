import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parentPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  childComment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  text: mongoose.Schema.Types.String,
  createdAt: { type: mongoose.Schema.Types.Date },
  updatedAt: { type: mongoose.Schema.Types.Date },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
