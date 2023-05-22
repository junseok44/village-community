import mongoose, { Schema, ObjectId, Document, PopulatedDoc } from "mongoose";
import Village from "./VillageSchema";
import User, { TUser } from "./UserSchema";
import Comment, { TComment } from "./CommentSchema";

export interface TPost extends Document<ObjectId> {
  _id: ObjectId;
  postNumber?: number;
  title: string;
  author: PopulatedDoc<TUser & Document<ObjectId>>;
  body: string;
  writeAt: Date;
  category: string;
  villageId: string;
  comments: PopulatedDoc<TComment & Document<ObjectId>>[];
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
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  villageId: { type: Schema.Types.ObjectId, ref: "Village" },
  meta: {
    view: Number,
    likes: Number,
  },
});

postSchema.pre("save", async function (next) {
  try {
    this.postNumber = (await Village.countDocuments()) + 1;

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

postSchema.pre(
  "findOneAndDelete",
  { query: true, document: true },
  async function (next) {
    console.log("removing post from users and village");
    try {
      const document: TPost | null = await this.model
        .findOne(this.getQuery())
        .populate("comments")
        .exec();
      if (!document) throw new Error("no document");

      const village = await Village.findByIdAndUpdate(
        document.villageId,
        { $pull: { posts: document._id } },
        { new: true }
      );
      if (!village) throw new Error("Village not found");

      const user = await User.findByIdAndUpdate(document.author, {
        $pull: { posts: document._id },
      });
      if (!user) throw new Error("User not found");

      await Promise.all(
        document.comments.map(async (item) => {
          // FIXME 이게 지금 안되고 있는 상황임.
          if (item && "author" in item) {
            await User.findByIdAndUpdate(item.author?._id, {
              $pull: {
                comments: item._id,
              },
            });
          }

          await Comment.findOneAndDelete({ _id: item?._id });
        })
      );
      console.log("deleted all");

      next();
    } catch (error: any) {
      console.log(error.message);
      next(error);
    }
  }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
