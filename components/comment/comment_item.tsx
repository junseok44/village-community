import React, { useState } from "react";
import styled from "@emotion/styled";
import { TUser } from "@/model/UserSchema";
import CommentBody from "./comment_item_body";
import { TComment } from "@/model/CommentSchema";
import { formatDate } from "@/lib/formatDate";
import { TCommentMock } from "@/pages/post/[postId]";
import { getfullUrl } from "@/lib/getfullUrl";

export const ListItemLayout = styled.div`
  padding: 1rem 0.3rem;
`;
const CommentItemLayout = styled.div`
  padding: 1rem;
  background: #dfe6e9;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
const PaddingLeft = styled.div`
  margin-top: 1rem;
  padding-left: 2rem;
`;

const CommentItem = ({
  comment,
  onDelete,
}: {
  comment: TCommentMock;
  onDelete: (id: string) => void;
}) => {
  // const isNested = comment.childComment.length > 0;
  const [isWriting, setIsWriting] = useState(false);

  return (
    <ListItemLayout>
      <CommentBody
        author={comment.author}
        body={comment.text}
        date={formatDate(comment.createdAt)}
        onClick={() => setIsWriting(!isWriting)}
        onDelete={() => onDelete(comment.id)}
      ></CommentBody>
    </ListItemLayout>
  );
};

export default CommentItem;
