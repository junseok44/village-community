import EditorComponent from "@/components/editor";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const WritePostPage = () => {
  return (
    <div className="write">
      <Head>
        <title>write somethin</title>
        <meta charSet="utf-8"></meta>
      </Head>
      <Editor></Editor>
      <style jsx>{`
        .write {
          margin: 4rem auto 0rem;
          width: 70%;
        }
      `}</style>
    </div>
  );
};

export default WritePostPage;
