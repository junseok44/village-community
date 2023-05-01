import dbConnect from "@/lib/db";
import Post from "@/model/PostSchema";
import { GetServerSideProps } from "next";
import React from "react";
import { TPost } from "..";
import PostLayout from "@/components/PostLayout";
import { getDataFromCookie } from "@/lib/auth-cookies";
import { UserToken } from "../api/Login";
import { Button } from "@mui/material";
import ButtonController from "@/components/shared/ButtonController";
import Link from "next/link";
import Modal from "@/components/shared/Modal";
import { useRouter } from "next/router";

const PostPage = ({ post, isAuthor }: { post: TPost; isAuthor: boolean }) => {
  const router = useRouter();
  const [isModal, setIsModal] = React.useState(false);

  const handlePostDelete = async () => {
    const response = await fetch(`/api/post/delete`, {
      method: "POST",
      body: JSON.stringify({ id: post._id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      router.push("/");
    }
  };
  return (
    <div className="pt-16">
      <PostLayout title={post.title}>
        <div
          className="my-post-style"
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></div>
      </PostLayout>
      {isModal && (
        <Modal
          message="렬루 삭제하시게씁니까?"
          onConfirm={handlePostDelete}
          onCancel={() => {
            setIsModal(false);
          }}
        ></Modal>
      )}
      <ButtonController>
        <>
          {isAuthor && (
            <>
              <Button
                variant="outlined"
                onClick={() => setIsModal(true)}
                color="error"
              >
                삭제하기
              </Button>
              <Link href={`/post/write?postId=${post._id}`}>
                <Button variant="outlined">수정하기</Button>
              </Link>
            </>
          )}
          <Link href="/">
            <Button variant="outlined">돌아가기</Button>
          </Link>
        </>
      </ButtonController>

      <style jsx>{`
        h1 {
          font-size: 2rem;
        }
        .controller {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.query;

  try {
    dbConnect();
    const post = await Post.findById(postId).populate("author").exec();
    const user = await getDataFromCookie<UserToken>(
      context.req,
      context.res,
      "user"
    );

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        isAuthor: post.author._id.toString() === user?.id,
      },
    };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
};
