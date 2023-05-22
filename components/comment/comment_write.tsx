import React from "react";
import styled from "@emotion/styled";
import { Button, Stack, TextField } from "@mui/material";
import { getfullUrl } from "@/lib/getfullUrl";
import { ObjectId, Schema } from "mongoose";
import { TCommentMock } from "@/pages/post/[postId]";
import { v4 } from "uuid";
const LoginForm = styled.div`
  width: 20%;
  div:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;
const WriteBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WriteComment = ({
  userId,
  userName,
  postId,
  setList,
}: {
  userId: Schema.Types.ObjectId;
  userName: string;
  postId: ObjectId;
  setList: React.Dispatch<React.SetStateAction<TCommentMock[]>>;
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { comment } = e.currentTarget;
    if (!userId || !comment || !postId) return alert("입력해주세요");

    const response = await fetch(getfullUrl("api/comment/create"), {
      method: "POST",
      body: JSON.stringify({
        parentPostId: postId,
        currentUserId: userId,
        text: comment?.value,
        message: "hello",
      }),
    });
    if (response.status === 200) {
      const body = await response.json();
      setList((prev) => [
        ...prev,
        {
          id: body.id,
          author: userName,
          createdAt: new Date(),
          text: comment.value,
        },
      ]);
    } else {
      alert("실패했습니다.");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <Stack direction="row" spacing={2}>
        {!userId && (
          <LoginForm>
            <TextField name="nickname" placeholder="닉네임"></TextField>
            <TextField
              name="password"
              placeholder="비밀번호"
              sx={{}}
            ></TextField>
            <TextField
              name="securityCode"
              placeholder="코드"
              sx={{}}
            ></TextField>
          </LoginForm>
        )}
        <WriteBody>
          <TextField
            name="comment"
            rows={3}
            multiline={true}
            fullWidth={true}
          ></TextField>
          <div className="mt-2 flex justify-end">
            <Button type="submit">작성하기</Button>
          </div>
        </WriteBody>
      </Stack>
    </form>
  );
};

export default WriteComment;
