import { formatDate } from "@/lib/formatDate";
import { ObjectId } from "mongoose";
import Link from "next/link";
import React from "react";

type PostListItemProps = {
  id: ObjectId;
  number: number;
  category: string;
  title: string;
  author: string;
  date: Date;
  views: number;
  likes: number;
};

// Destructure the props object and use it to render the component
const PostListItem: React.FC<PostListItemProps> = ({
  id,
  number,
  category,
  title,
  author,
  date,
  views,
  likes,
}) => {
  return (
    <li className="postList_item">
      <div className="item w-24">{number}</div>
      <div className="item w-24">{category}</div>
      <div className="item flex-1 title text-start">
        <Link
          href={`/post/${id}`}
          className="w-full h-full inline-block"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </Link>
      </div>
      <div className="item w-1/6">{author}</div>
      <div className="item w-16">{formatDate(date)}</div>
      <div className="item w-16">{views}</div>
      <div className="item w-16">{likes}</div>
      <style jsx>{`
        li {
          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }
          position: relative;
          display: flex;
          padding: 1rem 0rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          .item {
            height: 100%;
            box-sizing: border-box;
            &:not(.title) {
              text-align: center;
            }
            &.title {
              &:hover {
                cursor: pointer;
              }
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
