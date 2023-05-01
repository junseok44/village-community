import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("logout");
  const token = serialize("user", "", {
    maxAge: -1,
    expires: new Date(Date.now() - 1),
    path: "/",
  });
  res.setHeader("Set-Cookie", token).redirect("/");
  // TODO: 쿠키를 여러개 설정한다는것 관련해서.. 여전히 모르겠다.
  // 특히 파기할때는 같은 이름으로 해야한다는데. 어차피 cookie는 하나가 아닌가?
}
