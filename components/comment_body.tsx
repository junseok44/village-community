import React from "react";

const CommentBody = ({ onClick }: { onClick: any }) => {
  return (
    <div className="flex items-center h-4" onClick={() => onClick()}>
      <div className="w-32">author</div>
      <div className="flex-1">body</div>
      <div className="">date</div>
    </div>
  );
};

export default CommentBody;
