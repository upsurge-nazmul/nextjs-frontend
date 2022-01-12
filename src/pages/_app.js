import { MainContextProider } from "../context/Main";
import "../styles/globals.scss";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProider>
      <Component {...pageProps} />
    </MainContextProider>
  );
}

export default MyApp;
