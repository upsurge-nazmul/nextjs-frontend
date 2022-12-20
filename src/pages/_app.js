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
      <MainContextProider>
        <HMSRoomProvider>
          <NextNprogress color="#4166EB" />
          <Component {...pageProps} />
          <NotificationComponent />
        </HMSRoomProvider>
      </MainContextProider>
  );
}

export default MyApp;
