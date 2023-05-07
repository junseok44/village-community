import dbConnect from "@/lib/db";
import Post from "@/model/PostSchema";
import { GetServerSideProps } from "next";
import React from "react";
import { TPost } from "..";
import { getDataFromCookie, setCookie } from "@/lib/auth-cookies";
import { UserToken } from "../api/Login";
import { Stack, Divider, Button, Typography } from "@mui/material";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import Link from "next/link";
import Modal from "@/components/shared/Modal";
import { useRouter } from "next/router";
import { getfullUrl } from "@/lib/getfullUrl";
import PostBody from "@/components/shared/PostBody";

const PostPage = ({ post, isAuthor }: { post: TPost; isAuthor: boolean }) => {
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
    //유저당 한번만 할 수 있어야 함.
    // 내가 생각한 방법은. post에 저장?  아니면 user에 저장?
    // user에 저장시 -> anonymous에도 쿠키형태로 저장.
    // post에 저장시. userId를 저장한다. 그리고 나서 post에서 userId를 찾아서.  없으면.
    // 추천 하나 올리고. 근데 userId가 없으면???????????????
    // 즉 문제는 익명도 어떻게 하느냐인건ㄱ데.
    // 유동은 1일 1회 추천. 고닉은 1일 무제한. but 한글에는 하나만.

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
    <div className="pt-16">
      <Stack gap="1rem">
        <Typography variant="h4">{post.title}</Typography>
        <Divider></Divider>
        <PostBody html={post.body}></PostBody>
        {isModal && (
          <Modal
            message="삭제하시겠습니까?"
            onConfirm={handlePostDelete}
            onCancel={() => {
              setIsModal(false);
            }}
          ></Modal>
        )}
        {/* <ButtonController> */}
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
        {/* </ButtonController> */}
      </Stack>

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
      .exec();
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
