import React from "react";

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <a>안녕하세요</a>
        </li>
        <li>
          <a>이것은 footer입니다</a>
        </li>
        <li>
          <a>뭘 쓸지</a>
        </li>
        <li>
          <a>생각이 안났어요</a>
        </li>
        <li>
          <a>으아ㅏ</a>
        </li>
        <li>
          <a>귀찮아</a>
        </li>
      </ul>
      <span>Copyright ⓒ 2000 - 2013 junseok's site. All rights reserved.</span>
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
