import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../model/PostSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the id from the request body
    const { id } = req.body;

    // Find the post with the given id
    const post = await Post.findByIdAndRemove(id);

    // If the post doesn't exist, return an error
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the post

    // Return a success message
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    // If there's an error, return an error message
    res.status(500).json({ message: "Internal server error" });
  }
}
