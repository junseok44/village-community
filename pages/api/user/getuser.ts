import { getDataFromCookie } from "@/lib/auth-cookies";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username } = await getDataFromCookie<{ username: string }>(
      req,
      res,
      "username"
    );
    if (username) {
      res.send({ username: username });
    } else {
      throw new Error("no user");
    }
  } catch (e) {
    console.log(e);
    res.status(404).send("no user");
  }
}
