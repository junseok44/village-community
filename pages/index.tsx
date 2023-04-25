import { getfullUrl } from "@/lib/getfullUrl";
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
    const cookies = new Cookies(req, res);
    const data = cookies.get("username");
    const response = await fetch(getfullUrl(`api/home`), { method: "get" });
    // TODO: 이런식으로. getServersideProps는 어차피 client 번들에 안들어간다.
    // 그러므로 여기서 cookie parse해서 복호화해서 보내라.
    return {
      props: {
        user: JSON.stringify(data),
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