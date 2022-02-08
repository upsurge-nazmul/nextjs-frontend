import { MainContextProider } from "../context/Main";
import "../styles/globals.scss";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import NextNprogress from "nextjs-progressbar";
import NotificationComponent from "../components/NotificationComponent";

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProider>
      <NextNprogress color="#4166EB" />
      <Component {...pageProps} />
      <NotificationComponent />
    </MainContextProider>
  );
}

export default MyApp;
