import React from "react";

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <a>회사소개</a>
        </li>
        <li>
          <a>제휴안내</a>
        </li>
        <li>
          <a>광고안내</a>
        </li>
        <li>
          <a>이용약관</a>
        </li>
        <li>
          <a>청소년보호정책 </a>
        </li>
        <li>
          <a>운영원칙</a>
        </li>
      </ul>
      <span>Copyright ⓒ 2000 - 2013 junseokInside. All rights reserved.</span>
      <style jsx>{`
        footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 7rem;
          box-sizing: border-box;
          background: white;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          padding: 2rem;
          text-align: center;
          ul {
            li {
              display: inline-block;
              &:not(:last-child) {
                margin-right: 1rem;
                &::after {
                  content: "";
                  display: inline-block;
                  width: 0.3px;
                  height: 10px;
                  background: black;
                  margin-left: 1rem;
                }
                a {
                  cursor: pointer;
                  &:hover {
                    border-bottom: 1px solid black;
                  }
                }
              }
            }
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
