import { NextApiRequest, NextApiResponse } from "next";
import Village from "@/model/VillageSchema";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const village = await Village.findById(req.query.villageId);
    console.log(village);

    res.send("find");
  } catch (error) {}
}
