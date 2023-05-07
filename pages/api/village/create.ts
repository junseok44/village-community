import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Village from "@/model/VillageSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newVillage = await new Village({
      villageName: "마루마루 마을",
      category: ["으악악", "ㅇㄹㅇㅇㄹ", "ㅇㄹㅇㄹㄴㅇㄹㄴ"],
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
