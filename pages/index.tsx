import PostListHeader from "@/components/postlist_header";
import PostList_Item from "@/components/postlist_item";
import { Button } from "@mui/material";
import dbConnect from "@/lib/db";
import Post from "../model/PostSchema";
import { GetServerSideProps } from "next";
import React from "react";
import { UserToken } from "./api/Login";
import Village, { TVillage } from "../model/VillageSchema";
import Link from "next/link";
import { useRouter } from "next/router";
import { getDataFromCookie } from "@/lib/auth-cookies";
import { Stack } from "@mui/material";

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

interface HomeProps {
  user: UserToken | null;
  posts: TPost[];
  village: TVillage;
  totalPost: number;
}

const Home = ({ posts, user, village, totalPost }: HomeProps) => {
  const router = useRouter();
  const handleChangeCategory = (categoryName: string) => {
    router.push({
      pathname: router.pathname,
      query: { category: categoryName },
    });
  };

  const handleChangePage = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page },
    });
  };

  return (
    <>
      <div className="Home">
        <Stack rowGap={3}>
          <div className="villageName">{village.villageName}</div>
          <div className="villageInfo">
            villageInfo
            <Button>이사가기</Button>
          </div>
          <div>
            <div className="controller flex justify-between items-center">
              <ul className="category flex">
                <li key={"전체"} onClick={() => handleChangeCategory("")}>
                  전체
                </li>
                {village.category.map((category) => (
                  <li
                    key={category}
                    onClick={() => handleChangeCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <Link href="/post/write">
                <Button sx={{ whiteSpace: "nowrap" }}>새 글 작성하기</Button>
              </Link>
            </div>
            <ul className="postList">
              <PostListHeader></PostListHeader>
              {posts && posts.length > 0 ? (
                posts.map((post, index) => (
                  <PostList_Item
                    key={post._id}
                    id={post._id}
                    author={post.author?.username ?? "no"}
                    category={post.category ?? "일반"}
                    date={post.writeAt}
                    number={post.postNumber}
                    likes={post.meta.likes}
                    views={post.meta.view}
                    title={post.title}
                  ></PostList_Item>
                ))
              ) : (
                <div>게시글이 없습니다. 1빠따 어떠세요?</div>
              )}
            </ul>
          </div>

          <div className="pagenation">
            {totalPost > 0 &&
              Array.from(
                { length: Math.ceil(totalPost / 10) },
                (v, k) => k + 1
              ).map((number) => (
                <div onClick={() => handleChangePage(number)} key={number}>
                  {number}
                </div>
              ))}
          </div>
        </Stack>

        <style jsx>{`
          .Home {
            .villageName {
              font-size: 3rem;
            }
            .villageInfo {
              min-height: 10rem;
              border: 1px solid black;
            }
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
              .postlist_item {
                all: unset;
                display: block;
                padding: 0.7rem 0.5rem;
                height: 1rem;
              }
            }
            .pagenation {
              display: flex;
              justify-content: center;
              margin-top: 4rem;
              div:not(:last-child) {
                margin-right: 1rem;
              }
              div {
                position: relative;
                &:hover {
                  cursor: pointer;
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
        `}</style>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await dbConnect();

    const user = await getDataFromCookie<UserToken>(ctx.req, ctx.res, "user");

    if (!user)
      return {
        redirect: {
          destination: "/VillageInfo",
          permanent: false,
        },
      };

    const userVillage = await Village.findById(user.villageId);

    if (!userVillage) throw new Error("user error");

    const page = parseInt(ctx.query.page as string) || 1;
    const totalPost = await Post.countDocuments({
      ...(ctx.query.category && { category: ctx.query.category }),
    });
    const posts = await Post.find({
      ...(ctx.query.category && { category: ctx.query.category }),
    })
      .skip((page - 1) * 10)
      .limit(10)
      .populate("author")
      .sort([["writeAt", -1]])
      .exec();

    return {
      props: {
        user: user,
        posts: JSON.parse(JSON.stringify(posts)),
        village: JSON.parse(JSON.stringify(userVillage)),
        totalPost: totalPost,
      },
    };
  } catch (e: any) {
    console.log(e.message);

    return {
      props: {},
      redirect: {
        destination: "404",
      },
    };
  }
  // 그런데 문제는 cookie는

  // const response = await fetch(getfullUrl(`api/home`), { method: "get" });
  // const data = response ? await response.json() : "dodorodo";
};

export default Home;
