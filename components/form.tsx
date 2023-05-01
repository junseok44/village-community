import Link from "next/link";
import React from "react";

const Form = ({
  isLogin,
  errorMsg,
  onSubmit,
}: {
  isLogin: boolean;
  errorMsg: string;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
        <label>
          <span>Username</span>
          <input type="text" name="username" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" required />
        </label>
        {!isLogin && (
          <label>
            <span>Repeat password</span>
            <input type="password" name="rpassword" required />
          </label>
        )}

        <div className="submit">
          {isLogin ? (
            <>
              <Link href="/SignUp" legacyBehavior>
                <a>I don't have an account</a>
              </Link>
              <button type="submit">Login</button>
            </>
          ) : (
            <>
              <Link href="/Login" legacyBehavior>
                <a>I already have an account</a>
              </Link>
              <button type="submit">Signup</button>
            </>
          )}
        </div>
      </form>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        label > span {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .submit {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          justify-content: space-between;
        }
        .submit > a {
          text-decoration: none;
        }
        .submit > button {
          padding: 0.5rem 1rem;
          cursor: pointer;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .submit > button:hover {
          border-color: #888;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </div>
  );
};

export default Form;
