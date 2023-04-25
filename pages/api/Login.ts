import dbConnect from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import Iron from "@hapi/iron";
import User from "../../model/UserSchema";
import { setCookie } from "@/lib/auth-cookies";

const tokenPassword = "junseok1234andthisisreallyinterestingsdfssdfsdfsdfs";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;
  try {
    await dbConnect();
    const currentUser = await User.findOne({ username });

    if (!currentUser) {
      res.status(400).send({ message: "no currentUser" });
      return;
    }

    if (!(await currentUser.comparePassword(password))) {
      res.status(400).send({ message: "password not correct" });
      return;
    }

    const token = await Iron.seal({ username }, tokenPassword, Iron.defaults);
    setCookie(res, token);
    res.status(200).send("logined");
  } catch (e) {
    console.log(e);
  }
}
