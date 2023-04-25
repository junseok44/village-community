import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. cookie를 가져온다.
  // 2. cookie 안에 있는 token을 iron으로 복호화한다.
  // 3. 거기서 정보를 확인한다.
  // 4. 그 username을 가지고 db에서 정보를 찾는다.
  // 5. 유저에게 정보를 전달한다.

  console.log(req.cookies);

  res.send(req.cookies);
}
