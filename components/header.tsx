import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import Layout from "./Layout";

const Header = () => {
  const { data, error, isLoading } = useUser();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
          </li>

          {!isLoading && !error && data.user ? (
            <>
              <li>
                <Link href="/user/123" legacyBehavior>
                  <a>{data.user.username}'s Profile</a>
                </Link>
              </li>
              <li>
                <a href="/post/write">write a post</a>
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
