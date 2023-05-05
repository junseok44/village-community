import mongoose, { Schema, ObjectId } from "mongoose";
import Village from "./VillageSchema";
import User from "./UserSchema";

export interface TPost {
  postNumber: number;
  title: string;
  author: Schema.Types.ObjectId;
  body: string;
  writeAt: Date;
  category: string;
  villageId: string;
  meta: {
    view: number;
    likes: number;
  };
}

const postSchema = new Schema({
  postNumber: Number,
  title: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  body: String,
  writeAt: Date,
  category: String,
  villageId: { type: Schema.Types.ObjectId, ref: "Village" },
  meta: {
    view: Number,
    likes: Number,
  },
});

postSchema.pre("save", async function (next) {
  try {
    const village = await Village.findByIdAndUpdate(this.villageId, {
      $addToSet: {
        posts: this._id,
      },
    });
    if (!village) throw new Error("Village not found");

    const user = await User.findByIdAndUpdate(
      this.author,
      {
        $addToSet: { posts: this._id },
      },
      { new: true }
    );
    if (!user) throw new Error("user not found");

    next();
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

// postSchema.pre("findOneAndDelete", { query: true }, async function (next) {
//   console.log("removing post from users and village");

//   try {
//     console.log(this);

//     const removedPost = await this.findOne();
//     // const village = await Village.findByIdAndUpdate(
//     //   removedPost.villageId,
//     //   { $pull: { posts: removedPost._id } },
//     //   { new: true }
//     // );
//     // if (!village) throw new Error("Village not found");

//     // const user = await User.findByIdAndUpdate(removedPost.author, {
//     //   $pull: { posts: removedPost._id },
//     // });
//     // if (!user) throw new Error("User not found");

//     // next();
//   } catch (error: any) {
//     console.log(error.message);
//     next(error);
//   }
// });

export default mongoose.models.Post || mongoose.model("Post", postSchema);
