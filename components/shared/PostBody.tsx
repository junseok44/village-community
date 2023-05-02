import React from "react";

const PostBody = ({ html }: { html: string }) => {
  return (
    <div
      className="my-post-style"
      style={{ height: "20rem", overflow: "auto", lineHeight: "1.5" }}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default PostBody;
