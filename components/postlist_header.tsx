import React from "react";

// Destructure the props object and use it to render the component
const PostListHeader = ({}) => {
  return (
    <li>
      <div className="item w-24">번호</div>
      <div className="item w-24">카테고리</div>
      <div className="item flex-1">제목</div>
      <div className="item w-1/6">글쓴이</div>
      <div className="item w-16">날짜</div>
      <div className="item w-16">조회수</div>
      <div className="item w-16">좋아요</div>
      <style jsx>{`
        li {
          display: flex;
          padding: 1rem 0rem;
          border: 1px solid rgba(0, 0, 0, 0.3);
          .item {
            box-sizing: border-box;
            /* border: 1px solid black; */
            padding: 0 0.5rem;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      `}</style>
    </li>
  );
};

export default PostListHeader;
