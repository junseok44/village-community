import Layout from "@/components/Layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import dbConnect from "@/lib/db";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header></Header>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer></Footer>
    </>
  );
}

export async function getStaticProps() {
  try {
    await dbConnect();
  } catch (error) {
    console.log(error);
  }
}
