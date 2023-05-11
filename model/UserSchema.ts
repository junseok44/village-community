import mongoose, {
  Document,
  ObjectId,
  PopulatedDoc,
  Schema,
  Types,
} from "mongoose";
import bcrypt from "bcrypt";
import Village from "./VillageSchema";
import { TComment } from "./CommentSchema";

export interface TUser {
  username: string;
  villageId: Types.ObjectId;
  password: string;
  comments: PopulatedDoc<Document<ObjectId> & TComment>;
}

const userSchema = new Schema({
  username: String,
  villageId: Schema.Types.ObjectId,
  password: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

userSchema.pre("save", async function (next) {
  console.log("this saves?");
  try {
    console.log(this._id, this.username, this.villageId);

    const village = await Village.findByIdAndUpdate(
      this.villageId,
      {
        $addToSet: {
          users: this._id,
        },
      },
      { new: true }
    );

    if (!village) throw Error("no village");

    next();
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

userSchema.methods.hashPassword = async function hashPassword(
  plainPassword: string
) {
  const hashedPassword = await bcrypt.hash(plainPassword, 5);
  this.password = hashedPassword;
};

userSchema.methods.comparePassword = async function comparePassword(
  plainPassword: string
) {
  return await bcrypt.compare(plainPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
