import React from "react";

type PostListItemProps = {
  number: number;
  category: string;
  title: string;
  author: string;
  date: string;
  views: number;
  likes: number;
};

// Destructure the props object and use it to render the component
const PostListItem: React.FC<PostListItemProps> = ({
  number,
  category,
  title,
  author,
  date,
  views,
  likes,
}) => {
  return (
    <li>
      <div className="item w-24">{number}</div>
      <div className="item w-24">{category}</div>
      <div className="item flex-1 title text-start">{title}</div>
      <div className="item w-1/6">{author}</div>
      <div className="item w-16">{date}</div>
      <div className="item w-16">{views}</div>
      <div className="item w-16">{likes}</div>
      <style jsx>{`
        li {
          &:hover {
            cursor: pointer;
            background: rgba(0, 0, 0, 0.05);
          }
          display: flex;
          padding: 1rem 0rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          .item {
            height: 100%;
            box-sizing: border-box;
            &:not(.title) {
              text-align: center;
            }
            padding: 0 0.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      `}</style>
    </li>
  );
};

export default PostListItem;
