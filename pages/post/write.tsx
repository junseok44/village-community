import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import EditorLoading from "@/components/PostLayout";
import { GetServerSideProps } from "next";
import { checkUser } from "@/lib/user";
import Post from "../../model/PostSchema";
import sanitizeHTML from "sanitize-html";
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
  loading: () => (
    <>
      <EditorLoading></EditorLoading>
    </>
  ),
});

const WritePostPage = ({
  currentPost,
}: {
  currentPost:
    | {
        title: string;
        body: string;
        id: string;
      }
    | undefined;
}) => {
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
    const user = await checkUser(ctx);
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/Login",
        },
      };
    }

    const { postId } = ctx.query;
    const currentPost = await Post.findById(postId);
    if (!currentPost) return { props: {} };
    return {
      props: {
        currentPost: {
          title: currentPost.title,
          body: currentPost.body,
          id: currentPost._id.toString(),
        },
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {},
    };
  }
};

export default WritePostPage;
