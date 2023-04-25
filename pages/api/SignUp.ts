import { createUser, findUser } from "@/lib/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password, rpassword } = req.body;

  if (!username) {
    res.status(400).send({ message: "no username" });
    return;
  }
  if (!(password == rpassword)) {
    res.status(400).send({ message: "repeat password correctly" });
    return;
  }

  const currentUser = await findUser(username);
  if (currentUser)
    return res
      .status(400)
      .send({ message: "already user exist. try other username" });

  const user = await createUser({ username, password });
  if (!user) {
    res.status(400).send({ message: "create user failed" });
    return;
  }
  res.status(200).redirect("/Login");
}
