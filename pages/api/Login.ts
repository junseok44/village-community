import dbConnect from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import Iron from "@hapi/iron";
import User from "../../model/UserSchema";
import { setCookie } from "@/lib/auth-cookies";

const localTokenPassword = "123456356456425723457457247DSFASFASDFA245724724724";

export interface UserToken {
  username: string;
  id: string;
  villageId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;
  try {
    await dbConnect();
    const currentUser = await User.findOne({ username });

    if (!currentUser) {
      res.status(400).send({ message: "no username" });
      return;
    }

    if (!(await currentUser.comparePassword(password))) {
      res.status(400).send({ message: "password not correct" });
      return;
    }

    const userToken = await Iron.seal(
      {
        username: currentUser.username,
        id: currentUser._id,
        villageId: currentUser.villageId,
      },
      process.env.IRON_PASSWORD || localTokenPassword,
      Iron.defaults
    );

    setCookie(res, "user", userToken);

    res.status(200).send("logined");
  } catch (e) {
    console.log(e);
  }
}
