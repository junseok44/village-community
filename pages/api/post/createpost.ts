import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Post from "../../../model/PostSchema";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newPost = new Post({
      postNumber: 123,
      title: "nhk에 어서 오세요 4화까지 봤는데 재밌네",
      author: new mongoose.Types.ObjectId(),
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with d",
      writeAt: Date.now(),
      meta: {
        view: 0,
        likes: 0,
      },
    });
    newPost.save();
    res.send("created a post");
  } catch (error) {}
}
