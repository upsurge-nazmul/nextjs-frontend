import { MainContextProider } from "../context/Main";
import "../styles/globals.scss";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProider>
      <NextNprogress color="#4166EB" />
      <Component {...pageProps} />
    </MainContextProider>
  );
}

export default MyApp;
