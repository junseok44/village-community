import { getDataFromCookie } from "@/lib/auth-cookies";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await getDataFromCookie<{
      username: string;
      id: string;
    }>(req, res, "user");

    if (user) {
      res.send({ user });
    } else {
      throw new Error("no user");
    }
  } catch (e) {
    console.log("no user");

    res.status(404).send("no user");
  }
}
