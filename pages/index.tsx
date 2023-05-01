import PostListHeader from "@/components/postlist_header";
import PostList_Item from "@/components/postlist_item";
import { Button } from "@mui/material";
import dbConnect from "@/lib/db";
import Post from "../model/PostSchema";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import React from "react";
import { UserToken } from "./api/Login";
import { checkUser } from "@/lib/user";
import Link from "next/link";
import Header from "@/components/header";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export interface TPost {
  _id: string;
  title: string;
  postNumber: number;
  body: string;
  author: {
    id: string;
    username: string;
  } | null;
  meta: {
    view: number;
    likes: number;
  };
  writeAt: Date;
  category: string;
}

const Home = ({ posts, user }: { user: UserToken | null; posts: TPost[] }) => {
  const router = useRouter();

  const handleChangeCategory = (categoryName: string) => {
    router.push({
      pathname: router.pathname,
      query: { category: categoryName },
    });
  };

  return (
    <>
      <div className="Home">
        <div className="controller flex justify-between items-center">
          <ul className="category flex">
            <li onClick={() => handleChangeCategory("")}>전체</li>
            <li onClick={() => handleChangeCategory("일반")}>일반</li>
            <li onClick={() => handleChangeCategory("정보글")}>정보글</li>
            <li onClick={() => handleChangeCategory("이벤트")}>이벤트</li>
          </ul>
          <Button sx={{ whiteSpace: "nowrap" }}>
            <Link href="/post/write">새 글 작성하기</Link>
          </Button>
        </div>
        <ul className="postList">
          <PostListHeader></PostListHeader>
          {posts &&
            posts.map((post, index) => (
              <PostList_Item
                key={index}
                id={post._id}
                author={post.author?.username ?? "no"}
                category={post.category ?? "일반"}
                date={post.writeAt}
                number={post.postNumber}
                likes={post.meta.likes}
                views={post.meta.view}
                title={post.title}
              ></PostList_Item>
            ))}
        </ul>
        <style jsx>{`
          .Home {
            margin-top: 1rem;
            .controller {
              .category {
                li {
                  padding: 0 0.5rem;
                  cursor: pointer;
                  position: relative;

                  &:hover {
                    opacity: 0.7;
                    &::after {
                      content: "";
                      position: absolute;
                      bottom: -5px;
                      left: 50%;
                      transform: translate(-50%);
                      width: calc(100% - 1rem);
                      height: 1px;
                      background: black;
                    }
                  }
                }
              }
            }
            .postList {
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await dbConnect();
    const posts = await Post.find({
      ...(ctx.query.category && { category: ctx.query.category }),
    })
      .populate("author")
      .sort([["writeAt", -1]])
      .exec();

    const user = await checkUser(ctx);

    return {
      props: {
        user: user,
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (e: any) {
    console.log(e.message);

    return {
      props: {
        user: { username: "anonymous", id: null },
      },
    };
  }
  // 그런데 문제는 cookie는

  // const response = await fetch(getfullUrl(`api/home`), { method: "get" });
  // const data = response ? await response.json() : "dodorodo";
};

export default Home;
