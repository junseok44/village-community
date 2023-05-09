import React from "react";
import styled from "@emotion/styled";
import { Button, Stack, TextField } from "@mui/material";

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
const WriteComment = () => {
  return (
    <Stack direction="row" spacing={2}>
      <LoginForm>
        <TextField placeholder="닉네임"></TextField>
        <TextField placeholder="비밀번호" sx={{}}></TextField>
        <TextField placeholder="코드" sx={{}}></TextField>
      </LoginForm>
      <WriteBody>
        <TextField rows={3} multiline={true}></TextField>
        <div className="mt-2 flex justify-end">
          <Button>작성하기</Button>
        </div>
      </WriteBody>
    </Stack>
  );
};

export default WriteComment;
