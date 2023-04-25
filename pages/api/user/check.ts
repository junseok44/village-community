import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //1. req.body의 username, password를 받는다
  //2. db에서 그 유저가 있는지 확인한다.
  //3. 마찬가지로 password가 일치하는지 체크한다.
  //4.
}
