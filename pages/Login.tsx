import Form from "@/components/form";
import Router from "next/router";
import React, { useState } from "react";
import CenterLayout from "../components/shared/CenterLayout";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");
    try {
      const response = await fetch(`/api/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.currentTarget.username.value,
          password: e.currentTarget.password.value,
        }),
      });
      if (response.status == 200) {
        Router.push("/");
      } else {
        console.log(response.status);
        if (response.status === 400) {
          const errResponse = await response.json();
          if (typeof errResponse.message === "string")
            throw Error(errResponse.message);
        }
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  return (
    <>
      {/* <div className="login"> */}
      <CenterLayout>
        <Form isLogin={true} errorMsg={errorMsg} onSubmit={handleSubmit} />
      </CenterLayout>
      {/* </div> */}
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default Login;
