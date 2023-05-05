import React from "react";
import CenterLayout from "@/components/shared/CenterLayout";
import { GetServerSideProps } from "next";
import Village, { TVillage } from "@/model/VillageSchema";
import dbConnect from "@/lib/db";

// TODO : 각 스키마의 타입을 정의.
interface VillageInfoProps {
  villages: TVillage[] | null;
}

const VillageInfo = ({ villages }: VillageInfoProps) => {
  return (
    <CenterLayout>
      <div>
        <div>어떤 village에 관심이 있으세요?</div>
        {villages &&
          villages.map((village) => (
            <div key={village._id}>{village.villageName}</div>
          ))}
        <div>회원가입하시면 들어갈 수 있어요!</div>
        <div>이미 회원이신가요?</div>
      </div>
    </CenterLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await dbConnect();
    const villages = await Village.find({});
    return { props: { villages: JSON.parse(JSON.stringify(villages)) } };
  } catch (error) {
    console.log(error);
  }
  return {
    redirect: {
      destination: "404",
      permanent: false,
    },
  };
};

export default VillageInfo;
