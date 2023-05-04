import mongoose, { Schema } from "mongoose";

const VillageSchema = new mongoose.Schema({
  villageName: String,
  category: [{ type: String }],
  admin: { type: Schema.Types.ObjectId, ref: "User" },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.models.Village ||
  mongoose.model("Village", VillageSchema);
