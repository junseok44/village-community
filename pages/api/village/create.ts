import { NextApiRequest, NextApiResponse } from "next";
import Village from "../../../model/VillageSchema";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newVillage = await new Village({
      villageName: "너구리",
      category: ["전시회", "이벤트", "사진모음"],
      posts: [],
      users: [],
    });
  } catch (error) {}
}

let village1 = {
  villageName: "너구리",
  category: ["전시회", "이벤트", "사진모음"],
  posts: [],
  users: [],
};
