import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import EditorLoading from "@/components/PostLayout";
import { GetServerSideProps } from "next";
import Post from "@/model/PostSchema";
import Village from "@/model/VillageSchema";
import { getDataFromCookie } from "@/lib/auth-cookies";
import { UserToken } from "../api/Login";
import dbConnect from "@/lib/db";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
  loading: () => (
    <>
      <EditorLoading></EditorLoading>
    </>
  ),
});

interface WritePostPageProps {
  village: {
    id: string;
    categories: string[];
  };
  currentPost:
    | {
        title: string;
        body: string;
        id: string;
      }
    | undefined;
}

const WritePostPage = ({ currentPost, village }: WritePostPageProps) => {
  return (
    <div className="write">
      <Head>
        <title>write somethin</title>
        <meta charSet="utf-8"></meta>
      </Head>
      <Editor
        postTitle={currentPost?.title}
        postBody={currentPost?.body}
        revisePostId={currentPost?.id}
        villageId={village.id}
        villageCategories={village.categories}
      ></Editor>
      <style jsx>{`
        .write {
          margin: 4rem auto 0rem;
          width: 70%;
        }
      `}</style>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await dbConnect();
    const user = await getDataFromCookie<UserToken>(ctx.req, ctx.res, "user");

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/Login",
        },
      };
    }

    const userVillage = await Village.findById(user.villageId);
    if (!userVillage) throw Error("no village in this user");

    const { postId } = ctx.query;
    const currentPost = await Post.findById(postId);
    if (!currentPost)
      return {
        props: {
          village: {
            id: userVillage._id.toString(),
            categories: userVillage.category,
          },
        },
      };

    return {
      props: {
        currentPost: {
          title: currentPost.title,
          body: currentPost.body,
          id: currentPost._id.toString(),
        },
        village: {
          id: userVillage._id.toString(),
          categories: userVillage.category,
        },
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default WritePostPage;
