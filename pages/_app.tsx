import Layout from "@/components/Layout";
import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header></Header>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
