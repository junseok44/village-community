import React from "react";

const CommentBody = ({
  onClick,
  onDelete,
  author,
  body,
  date,
}: {
  onClick: any;
  onDelete: any;
  author: string;
  body: string;
  date: string;
}) => {
  return (
    <div className="flex items-center h-4" onClick={() => onClick()}>
      <div className="w-32">{author}</div>
      <div className="flex-1">{body}</div>
      <div className="">{date}</div>
      <div
        className="pl-4 text-red-600 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        삭제
      </div>
    </div>
  );
};

export default CommentBody;
