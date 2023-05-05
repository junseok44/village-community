import mongoose, { Schema, Types } from "mongoose";
import { TPost } from "./PostSchema";
import { TUser } from "./UserSchema";

export interface TVillage {
  _id: string;
  villageName: string;
  category: string[];
  admin: Types.ObjectId;
  posts: Types.ObjectId[];
  users: Types.ObjectId[];
}

const VillageSchema = new mongoose.Schema<TVillage>({
  villageName: String,
  category: [{ type: String }],
  admin: { type: Schema.Types.ObjectId, ref: "User" },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.models.Village ||
  mongoose.model<TVillage>("Village", VillageSchema);
