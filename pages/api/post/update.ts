import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../model/PostSchema";
import sanitizeHTML from "sanitize-html";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the request body
  const { title, body, category, id } = req.body;

  // Sanitize the HTML body
  const sanitizedBody = sanitizeHTML(body, {
    allowedTags: ["p", "strong", "em", "br", "del"],
  });

  try {
    // Find the post with the given id and update its title, body, and category
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, body: sanitizedBody, category },
      { new: true }
    );

    // Return the updated post
    res.status(200).json(updatedPost);
  } catch (error) {
    // Return an error if the post could not be updated
    res.status(500).json({ message: "Could not update post" });
  }
}
