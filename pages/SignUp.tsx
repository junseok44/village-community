import Form from "@/components/form";
import Router from "next/router";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Village from "@/model/VillageSchema";
import CenterLayout from "../components/shared/CenterLayout";

interface SignUpProps {
  villageList: string[];
}

const SignUp = ({ villageList }: SignUpProps) => {
  const [errMsg, setErrorMsg] = useState("");
  const [villageSelectValue, setVillageSelectValue] = useState(villageList[0]);
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
          villageName: villageSelectValue,
        }),
      });
      if (response.status == 200) {
        Router.push("/Login");
      } else {
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
        <Form
          isLogin={false}
          onSubmit={handleSubmit}
          errorMsg={errMsg}
          villageList={villageList}
          villageSelectValue={villageSelectValue}
          onSelect={setVillageSelectValue}
        />
      </CenterLayout>
    </>
  );
};

export default SignUp;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const villages = await Village.find({});
    const villageList = villages.map((village) => village.villageName);

    return {
      props: {
        villageList,
      },
    };
  } catch (error) {}

  return {
    redirect: {
      destination: "404",
      permanent: false,
    },
  };
};
