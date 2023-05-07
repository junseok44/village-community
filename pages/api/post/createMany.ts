import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/model/PostSchema";
import mongoose from "mongoose";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    for (let index = 50; index < 55; index++) {
      const newPost = await new Post({
        postNumber: 123,
        title: `테스트 ${index}`,
        author: new mongoose.Types.ObjectId("6454684b7b56ba2269d3a6af"),
        body: "sdfsdfsd",
        writeAt: Date.now(),
        category: "이벤트",
        villageId: new mongoose.Types.ObjectId("6453b70da95341bd105c9bc5"),
        meta: {
          view: 0,
          likes: 0,
        },
      });
      newPost.save();
      console.log(`${index} post created`);
    }
    res.send("created many posts");
  } catch (error) {
    console.log(error);
    res.send("failed");
  }
}
