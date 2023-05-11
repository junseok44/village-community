import dbConnect from "@/lib/db";
// import Comment from "@/model/CommentSchema";
import Post from "@/model/PostSchema";
import { GetServerSideProps } from "next";
import React from "react";
import { getDataFromCookie } from "@/lib/auth-cookies";
import { UserToken } from "../api/Login";
import { Stack, Divider, Button, Typography } from "@mui/material";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import Link from "next/link";
import Modal from "@/components/shared/Modal";
import { useRouter } from "next/router";
import { getfullUrl } from "@/lib/getfullUrl";
import PostBody from "@/components/shared/PostBody";
import styled from "@emotion/styled";
import CommentItem, { ListItemLayout } from "@/components/comment/comment_item";
import WriteComment from "@/components/comment/comment_write";
import { TUser } from "@/model/UserSchema";
import { TPost } from "@/model/PostSchema";
import { TComment } from "@/model/CommentSchema";

const CommentBox = styled.div`
  border-bottom: 3px solid blue;
  &:first-of-type {
    border-top: 3px solid blue;
  }
`;

const PostPage = ({
  post,
  isAuthor,
  user,
}: {
  post: TPost;
  isAuthor: boolean;
  user: UserToken;
}) => {
  const router = useRouter();
  const [isModal, setIsModal] = React.useState(false);
  const [likes, setLikes] = React.useState(post.meta.likes);

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

  const handlePostRecommend = async () => {
    const response = await fetch(getfullUrl("api/post/recommend"), {
      method: "POST",
      body: JSON.stringify({ postId: post._id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 400) {
      alert(await response.text());
    } else if (response.status == 200) {
      setLikes(likes + 1);
    }
  };
  return (
    <div className="pt-16 max-w-6xl mx-auto">
      <Stack gap="1rem">
        <Typography variant="h4">{post.title}</Typography>
        <Divider></Divider>
        <PostBody html={post.body}></PostBody>

        <Stack direction="row" justifyContent={"space-between"} gap={2}>
          <Stack direction="row" gap={"0.5rem"} alignItems="center">
            <ThumbUpAltRoundedIcon></ThumbUpAltRoundedIcon>
            <Typography sx={{ margin: "0 0.5rem 0 -0.2rem" }}>
              {likes}
            </Typography>
            <Button
              variant="outlined"
              color="success"
              onClick={handlePostRecommend}
            >
              좋아요
            </Button>
            <Link href="/">
              <Button variant="outlined">돌아가기</Button>
            </Link>
          </Stack>
          {isAuthor && (
            <Stack direction="row" gap={"0.5rem"}>
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
            </Stack>
          )}
        </Stack>
        <div className="mt-20">
          {post.comments.length > 0 && (
            <CommentBox>
              {post.comments.map((comment) => {
                if (!comment) return;
                return <CommentItem comment={comment as TComment} />;
              })}
            </CommentBox>
          )}

          <CommentBox>
            <ListItemLayout>
              <WriteComment postId={post._id} userId={user.id}></WriteComment>
            </ListItemLayout>
          </CommentBox>
        </div>
      </Stack>
      {isModal && (
        <Modal
          message="삭제하시겠습니까?"
          onConfirm={handlePostDelete}
          onCancel={() => {
            setIsModal(false);
          }}
        ></Modal>
      )}
    </div>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.query;

  try {
    dbConnect();
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: {
          "meta.view": 1,
        },
      },
      { new: true }
    )
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
          select: "username",
        },
      })
      .exec();

    const user = await getDataFromCookie<UserToken>(
      context.req,
      context.res,
      "user"
    );

    if (!user) throw Error("postid page : no user");

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        user: JSON.parse(JSON.stringify(user)),
        isAuthor: post.author._id.toString() === user?.id,
      },
    };
  } catch (error: any) {
    console.log(error);

    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
};
