import { serialize } from "cookie";
import Iron from "@hapi/iron";
import { NextApiResponse } from "next";
import Cookies from "cookies";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

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

  res.setHeader("Set-Cookie", [myCookie]);
};

export const getDataFromCookie = async <T>(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  },
  res: ServerResponse,
  name: string
) => {
  try {
    if (!req || !res) return null;
    const cookies = new Cookies(req, res);
    const data = cookies.get(name);

    if (!data) return null;
    const cookieData: T = await Iron.unseal(
      data,
      process.env.IRON_PASSWORD || "",
      Iron.defaults
    );

    return cookieData;
  } catch (error) {
    console.log(error);
  }
};
