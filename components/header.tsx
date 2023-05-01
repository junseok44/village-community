import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import Layout from "./Layout";
import { UserToken } from "@/pages/api/Login";

const Header = () => {
  const { data, isLoading, error } = useUser();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/" legacyBehavior>
              <a>Home</a>
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
                <Link href="/post/write">글 쓰기</Link>
              </li>
              <li>
                <a href="/api/user/logout">Logout</a>
              </li>
            </>
          ) : (
            <li>
              <Link href="/Login" legacyBehavior>
                <a>Login</a>
              </Link>
            </li>
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
        }
      `}</style>
    </header>
  );
};

export default Header;
