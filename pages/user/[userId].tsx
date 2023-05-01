import React from "react";
import { GetServerSideProps } from "next";
import { checkUser } from "@/lib/user";
import CenterLayout from "../../components/shared/CenterLayout";
const UserPage = () => {
  return <CenterLayout>this is user pag!</CenterLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await checkUser(ctx);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/Login",
      },
    };
  }

  return {
    props: {},
  };
};

export default UserPage;
