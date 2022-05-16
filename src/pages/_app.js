import { MainContextProider } from "../context/Main";
import "../styles/globals.scss";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import NextNprogress from "nextjs-progressbar";
import NotificationComponent from "../components/NotificationComponent";
import { HMSRoomProvider } from "@100mslive/react-sdk";
function MyApp({ Component, pageProps }) {
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
