import Link from "next/link";
import React from "react";

type PostListItemProps = {
  id: string;
  number: number;
  category: string;
  title: string;
  author: string;
  date: Date;
  views: number;
  likes: number;
};

function formatDate(timestamp: Date) {
  const now = Date.now();
  const date = new Date(timestamp);
  const isToday = date.toDateString() === new Date(now).toDateString();

  if (isToday) {
    // Display time if it's today
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    // Display date if it's not today
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${month}/${day}`;
  }
}

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
    <li>
      <div className="item w-24">{number}</div>
      <div className="item w-24">{category}</div>
      <div className="item flex-1 title text-start">
        <Link href={`/post/${id}`} className="w-100">
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
            &.title {
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
