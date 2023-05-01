import Form from "@/components/form";
import Router from "next/router";
import React, { useState } from "react";
import CenterLayout from "../components/shared/CenterLayout";
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
      <CenterLayout>
        <Form isLogin={false} onSubmit={handleSubmit} errorMsg={errMsg} />
      </CenterLayout>
    </>
  );
};

export default SignUp;
