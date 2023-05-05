import Link from "next/link";
import React from "react";

const Form = ({
  isLogin,
  errorMsg,
  villageList,
  villageSelectValue,
  onSubmit,
  onSelect,
}: {
  isLogin: boolean;
  errorMsg: string;
  villageList: string[] | null;
  villageSelectValue?: string;
  onSubmit: (e: React.FormEvent) => void;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
        <label>
          <span>유저명</span>
          <input type="text" name="username" />
        </label>
        <label>
          <span>비밀번호</span>
          <input type="password" name="password" required />
        </label>
        {!isLogin && (
          <label>
            <span>비밀번호 재입력</span>
            <input type="password" name="rpassword" required />
          </label>
        )}
        {villageList && (
          <label>
            <span>들어가실 마을을 선택해주세요</span>
            <select
              onChange={(e) => {
                onSelect(e.target.value);
              }}
              value={villageSelectValue}
            >
              {villageList.map((name) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="submit">
          {isLogin ? (
            <>
              <Link href="/SignUp" legacyBehavior>
                <a>계정이 없으세요?</a>
              </Link>
              <button type="submit">로그인</button>
            </>
          ) : (
            <>
              <Link href="/Login" legacyBehavior>
                <a>이미 계정이 있으신가요?</a>
              </Link>
              <button type="submit">회원가입</button>
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
          margin-left: 1rem;
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
