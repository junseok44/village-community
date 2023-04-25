import dbConnect from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../model/UserSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    await User.deleteMany();
    res.status(200).send("deleted all user");
  } catch (e) {
    console.log(e);
    res.status(400).send("error occured");
  }
}
