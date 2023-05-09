import { useUser } from "@/hooks/useUser";
import Link from "next/link";

const Header = () => {
  const { data, isLoading, error } = useUser();

  return (
    <header>
      <nav>
        {/* <h5>{data.user.villageId}</h5> */}
        <ul>
          <li>
            <Link href="/" legacyBehavior>
              <a>홈으로</a>
            </Link>
          </li>
          {!error && !isLoading && data.user ? (
            <>
              <li>
                <Link href="/user/123" legacyBehavior>
                  <a>{data.user.username}'s Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/post/write">글쓰기</Link>
              </li>
              <li>
                <a href="/api/user/logout">로그아웃</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/Login" legacyBehavior>
                  <a>로그인</a>
                </Link>
              </li>
              <li>
                <Link href="/SignUp" legacyBehavior>
                  <a>회원가입</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          max-width: 70%;
          margin: 0 auto;
          padding: 1.2rem 1.25rem;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        header {
          color: #fff;
          background-color: #333;
          height: 3.5rem;
        }
      `}</style>
    </header>
  );
};

export default Header;
