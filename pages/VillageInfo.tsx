import React, { useState, useRef, useEffect } from "react";
import CenterLayout from "@/components/shared/CenterLayout";
import { GetServerSideProps } from "next";
import Village, { TVillage } from "@/model/VillageSchema";
import dbConnect from "@/lib/db";
import VillageInfoCard from "@/components/VillageInfoCard";
import { Stack, Typography } from "@mui/material";
import Carosel from "@/components/Carosel";
import Link from "next/link";

// TODO : 각 스키마의 타입을 정의.
interface VillageInfoProps {
  villages: TVillage[] | null;
}

const VillageInfo = ({ villages }: VillageInfoProps) => {
  return (
    <CenterLayout>
      <Stack gap={3} alignItems={"center"} sx={{ width: "100%" }}>
        <Typography variant="h4">어떤 마을에 관심이 있으세요?</Typography>
        {villages && (
          <Carosel
            items={villages.map((village) => (
              <VillageInfoCard
                key={village._id}
                title={village.villageName}
                description="dfd"
              ></VillageInfoCard>
            ))}
            windowSize={4}
          ></Carosel>
        )}
        <Stack direction="row" alignItems={"center"} columnGap={2}>
          <Link href="/SignUp">
            <div>회원가입하시면 들어갈 수 있어요!</div>
          </Link>
          <Link href="/Login">
            <Typography color={"Highlight"}>이미 회원이신가요?</Typography>
          </Link>
        </Stack>
      </Stack>
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
