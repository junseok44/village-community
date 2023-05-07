import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/model/PostSchema";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await Post.deleteMany({});
    console.log("deleted all");
    res.status(200);

    res.send("deletedall");
  } catch (error) {
    console.log(error);
    res.send("error");
  }
}
