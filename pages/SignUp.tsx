import Form from "@/components/form";
import Router from "next/router";
import React, { useState } from "react";

const SignUp = () => {
  const [errMsg, setErrorMsg] = useState("");
  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();

    if (errMsg) setErrorMsg("");
    try {
      const response = await fetch(`/api/SignUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.currentTarget.username.value,
          password: e.currentTarget.password.value,
          rpassword: e.currentTarget.rpassword.value,
        }),
      });
      if (response.status == 200) {
        Router.push("/Login");
      } else {
        console.log(response.status);
        if (response.status == 400) {
          const errResponse = await response.json();
          throw Error(errResponse.message);
        }
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  return (
    <>
      <div className="login">
        <Form isLogin={false} onSubmit={handleSubmit} errorMsg={errMsg} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 4rem auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default SignUp;
