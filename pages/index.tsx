import PostListHeader from "@/components/postlist_header";
import PostList_Item from "@/components/postlist_item";
import { getDataFromCookie } from "@/lib/auth-cookies";
import dbConnect from "@/lib/db";
import Post from "../model/PostSchema";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";

interface UserProps {
  username: string;
  id: string;
}

interface PostProps {
  title: string;
  postNumber: string;
  author: string;
  meta: {
    view: number;
    likes: number;
  };
  writeAt: Date;
}

const Home = ({ user, posts }: { user: UserProps; posts: PostProps[] }) => {
  return (
    <div className="Home">
      {/* <h1 className="text-xl">hello {user.username}!!</h1> */}
      <ul>
        <PostListHeader></PostListHeader>
        {posts &&
          posts.map((post, index) => (
            <PostList_Item
              key={index}
              author="삐리리리리불어봐유포니엄"
              category="일반"
              date="2025"
              number={21215}
              likes={23}
              views={101}
              title={post.title}
            ></PostList_Item>
          ))}
        {/* {[1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
          (item) => (
            <PostList_Item
              key={item}
              author="삐리리리리불어봐유포니엄"
              category="일반"
              date="2025"
              number={21215}
              likes={23}
              views={101}
              title="Utilities for controlling how flex items both grow and shrink."
            ></PostList_Item>
          )
        )} */}
      </ul>
      <style jsx>{`
        .Home {
          margin-top: 1rem;
          ul {
            width: 90%;
            margin: 0 auto;
            .postlist_item {
              all: unset;
              display: block;
              padding: 0.7rem 0.5rem;
              height: 1rem;
            }
          }
        }
      `}</style>
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
    const { username, id } = await getDataFromCookie<UserProps>(
      req,
      res,
      "user"
    );

    await dbConnect();
    const posts = await Post.find({});

    return {
      props: {
        user: { username, id },
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (e) {
    return {
      props: {
        user: { username: "anonymous", id: null },
      },
    };
  }
  // 그런데 문제는 cookie는

  // const response = await fetch(getfullUrl(`api/home`), { method: "get" });
  // const data = response ? await response.json() : "dodorodo";
}

export default Home;
