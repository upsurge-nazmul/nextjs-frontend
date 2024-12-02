// import { HMSRoomProvider } from '@100mslive/react-sdk';
import { useRouter } from "next/dist/client/router";
import NextNprogress from "nextjs-progressbar";
import { useEffect } from "react";
import FadePageTransition from "../components/Animations/PageFadeTransition";
import NotificationComponent from "../components/NotificationComponent";
import { MainContextProider } from "../context/Main";
import "../styles/globals.scss";
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // useEffect(() => {
  //   import("react-facebook-pixel")
  //     .then((x) => x.default)
  //     .then((ReactPixel) => {
  //       ReactPixel.init("301023181478444"); // facebookPixelId
  //       ReactPixel.pageView();
  //       router.events.on("routeChangeComplete", () => {
  //         ReactPixel.pageView();
  //       });
  //     });
  // }, [router.events]);

  return (
    <MainContextProider>
      {/* <HMSRoomProvider> */}
      <NextNprogress color="#4166EB" />
      <FadePageTransition durationInSec={0.5} key={router.asPath}>
        <Component {...pageProps} />
      </FadePageTransition>
      <NotificationComponent />
      {/* </HMSRoomProvider> */}
    </MainContextProider>
  );
}

export default MyApp;
