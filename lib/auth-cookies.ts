import { serialize } from "cookie";
import Iron from "@hapi/iron";
import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

const MAX_AGE = 60 * 60 * 8;

export const setCookie = (res: NextApiResponse, key: string, value: string) => {
  const cookieOptions = {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // sameSite: "lax",
  };

  const myCookie = serialize(key, value, cookieOptions);

  res.setHeader("Set-Cookie", myCookie);
};

export const getDataFromCookie = async <T>(
  req: NextApiRequest,
  res: NextApiResponse,
  name: string
) => {
  const cookies = new Cookies(req, res);
  const data = cookies.get(name);
  if (!data) throw Error("no user");
  const cookieData: T = await Iron.unseal(
    data,
    process.env.IRON_PASSWORD || "",
    Iron.defaults
  );
  return cookieData;
  //get user from cookie.
  // 어디까지 확장할것인가?
};
