import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../model/PostSchema";
import { getDataFromCookie } from "@/lib/auth-cookies";
import sanitizeHTML from "sanitize-html";
import { UserToken } from "../Login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { title, body, category, villageId } = req.body;

    const userData = await getDataFromCookie<UserToken>(req, res, "user");

    body = sanitizeHTML(body, {
      allowedTags: ["del", "b", "strong", "p", "em", "br"],
    });

    const newPost = await new Post({
      title,
      postNumber: 123,
      author: userData!.id,
      body: body,
      villageId,
      category: category,
      writeAt: Date.now(),
      meta: { view: 0, likes: 0 },
    });

    newPost.save();

    res.status(200).send("created a post");
  } catch (error: any) {
    console.log(error.message);
    res.status(404).send("error occured");
  }
}
