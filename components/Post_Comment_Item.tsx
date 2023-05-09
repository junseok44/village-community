import React, { useState } from "react";
import styled from "@emotion/styled";
import WriteComment from "./comment_write";
import PostBody from "./shared/PostBody";
import CommentBody from "./comment_body";

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

const CommentItem = ({ nestedItem }: { nestedItem: any[] }) => {
  const isNested = nestedItem.length > 0;
  const [isWriting, setIsWriting] = useState(false);
  return (
    <ListItemLayout>
      <CommentBody onClick={() => setIsWriting(!isWriting)}></CommentBody>
      <PaddingLeft>
        {isWriting && (
          <CommentItemLayout>
            <WriteComment></WriteComment>
          </CommentItemLayout>
        )}
        {isNested && (
          <>
            <CommentItemLayout>
              <CommentBody onClick={() => {}}></CommentBody>
            </CommentItemLayout>
            <CommentItemLayout>
              <CommentBody onClick={() => {}}></CommentBody>
            </CommentItemLayout>
            <CommentItemLayout>
              <CommentBody onClick={() => {}}></CommentBody>
            </CommentItemLayout>
          </>
        )}
      </PaddingLeft>
    </ListItemLayout>
  );
};

export default CommentItem;
