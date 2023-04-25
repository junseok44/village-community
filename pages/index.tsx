import { getDataFromCookie } from "@/lib/auth-cookies";
import { getfullUrl } from "@/lib/getfullUrl";
import Iron from "@hapi/iron";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";

const Home = ({ user }: { user: any }) => {
  return (
    <div>
      <h1 className="text-xl">hello {user}!!</h1>
    </div>
  );
};

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  try {
    const { username } = await getDataFromCookie<{ username: string }>(
      req,
      res,
      "username"
    );
    return {
      props: {
        user: username,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        user: "anonymous",
      },
    };
  }
  // 그런데 문제는 cookie는

  // const response = await fetch(getfullUrl(`api/home`), { method: "get" });
  // const data = response ? await response.json() : "dodorodo";
}

export default Home;
