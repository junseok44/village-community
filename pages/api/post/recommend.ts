import Post from "@/model/PostSchema";
import { getDataFromCookie, setCookie } from "@/lib/auth-cookies";
import { NextApiRequest, NextApiResponse } from "next";
import Iron from "@hapi/iron";
import { localTokenPassword } from "../Login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { postId } = req.body;
    if (!postId) throw Error("postId is required");
    const postRecommendArr = await getDataFromCookie<string[]>(
      req,
      res,
      "post-recommend"
    );

    const currentUser = await getDataFromCookie<{ id: string }>(
      req,
      res,
      "user"
    );

    const currentPost = await Post.findById(postId);
    if (!currentPost) throw Error("post not found");

    if (currentPost._id == currentUser?.id) {
      throw Error("자추는 너무 추해용~~");
    }

    if (postRecommendArr && postRecommendArr.includes(postId)) {
      throw Error("중복 추천은 안되용~~");
    }

    let newPostRecommendArr: string[] = [];
    postRecommendArr
      ? postRecommendArr.push(postId)
      : newPostRecommendArr.push(postId);

    const token = await Iron.seal(
      postRecommendArr || newPostRecommendArr,
      process.env.IRON_PASSWORD || localTokenPassword,
      Iron.defaults
    );
    setCookie(res, "post-recommend", token);

    currentPost.meta.likes += 1;
    await currentPost.save();

    res.status(200).send("recommended");
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
