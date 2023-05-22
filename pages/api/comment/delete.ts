import { NextApiRequest, NextApiResponse } from "next";
import Comment from "@/model/CommentSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await JSON.parse(req.body);

    const comment = await Comment.findOneAndDelete({ _id: response.id }).exec();

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
