import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
const PostLayout = ({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <div
        style={{
          minHeight: "3rem",
          border: "1px solid rgba(0,0,0,0.1)",
          marginBottom: "1rem",
        }}
      >
        <TextField
          title="제목"
          sx={{ width: "100%" }}
          value={title ?? ""}
        ></TextField>
      </div>
      <div
        style={{
          minHeight: "20rem",
          border: "1px solid rgba(0,0,0,0.1)",
          padding: "1rem",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PostLayout;
