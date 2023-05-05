import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Village from "@/model/VillageSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newVillage = await new Village({
      villageName: "연애가 하고싶은 사람들 마을",
      category: ["계모임", "사랑을 알고싶어", "두근두근 소개팅"],
      admin: new mongoose.Types.ObjectId("644c92eeb881731d415921ca"),
      posts: [],
      users: [],
    });

    newVillage.save();

    res.send("village created");
  } catch (error) {
    res.send("error occurred");
  }
}
