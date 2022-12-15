import { MainContextProider } from "../context/Main";
import "../styles/globals.scss";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import NextNprogress from "nextjs-progressbar";
import Head from 'next/head';
import NotificationComponent from "../components/NotificationComponent";
import { HMSRoomProvider } from "@100mslive/react-sdk";
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("301023181478444"); // facebookPixelId
        ReactPixel.pageView();
        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png?v=1.5">
        <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png?v=1.5">
        <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png?v=1.5">
        <link rel="mask-icon" href="/public/safari-pinned-tab.svg?v=1.5" color="#17d1bc">
        <link rel="shortcut icon" href="/public/favicon.ico?v=1.5">
        <meta name="msapplication-TileColor" content="#17d1bc">
        <meta name="msapplication-TileImage" content="/public/mstile-144x144.png?v=1.5">
        <meta name="msapplication-config" content="/public/browserconfig.xml?v=1.5">
        <meta name="theme-color" content="#ffffff">
      </Head>
      <MainContextProider>
        <HMSRoomProvider>
          <NextNprogress color="#4166EB" />
          <Component {...pageProps} />
          <NotificationComponent />
        </HMSRoomProvider>
      </MainContextProider>
    </>
  );
}

export default MyApp;
