import { NextApiResponse } from "next";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 8;

export const setCookie = (res: NextApiResponse, value: string) => {
  const cookieOptions = {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // sameSite: "lax",
  };

  const myCookie = serialize("username", value, cookieOptions);

  res.setHeader("Set-Cookie", myCookie);
};
