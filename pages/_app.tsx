import Layout from "@/components/Layout";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getDataFromCookie } from "@/lib/auth-cookies";
import "@/styles/globals.css";
import { NextPageContext } from "next";
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

// export async function getInitialProps(ctx: any) {
//   console.log("initial");

//   // if (ctx.req) {
//   //   console.log(ctx.req);
//   //   // const session = getDataFromCookie(ctx.req, ctx.res, "user");
//   // }
// }
