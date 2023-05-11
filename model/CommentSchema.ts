import mongoose, { Document, ObjectId, PopulatedDoc, Schema } from "mongoose";
import { TUser } from "./UserSchema";
import User from "./UserSchema";
import Post from "./PostSchema";

export interface TComment {
  author: PopulatedDoc<Document<ObjectId> & TUser>;
  parentPost: string;
  childComment: PopulatedDoc<Document<ObjectId> & TComment>[];
  text: string;
  createdAt: Date;
  updatedAt?: Date;
}

const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  childComment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  text: { type: mongoose.Schema.Types.String, required: true },
  createdAt: { type: mongoose.Schema.Types.Date },
  updatedAt: { type: mongoose.Schema.Types.Date },
});

CommentSchema.pre("save", async function (next) {
  try {
    await User.findByIdAndUpdate(this.author, {
      $addToSet: {
        comments: this._id,
      },
    });

    await Post.findByIdAndUpdate(this.parentPost, {
      $addToSet: {
        comments: this._id,
      },
    });
  } catch (error: any) {
    next(error);
  }
});

CommentSchema.pre(
  "remove",
  { query: false, document: true },
  async function (next) {
    console.log("try deleting comment from post and user");

    try {
      // const doc = await this.model.findOne(this.getQuery());

      await User.findByIdAndUpdate(this.author, {
        $pull: {
          comments: this._id,
        },
      });

      await Post.findByIdAndUpdate(this.parentPost, {
        $pull: {
          comments: this._id,
        },
      });
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
);

// CommentSchema.pre("update", function (next) {
//   try {
//     this.getQuery()
//   } catch (error) {}
// });

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
