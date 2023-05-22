import { NextApiRequest, NextApiResponse } from "next";
import Comment, { TComment } from "@/model/CommentSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUserId, parentPostId, text } = await JSON.parse(req.body);

      const newComment = await new Comment<TComment>({
        author: currentUserId,
        parentPost: parentPostId,
        text: text,
        childComment: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      newComment.save();

      res.status(200).json({ id: newComment._id });
    } else {
      res.status(400).json({ message: "Invalid request method" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
}
