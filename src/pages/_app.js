import { MainContextProider } from "../context/Main";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProider>
      <Component {...pageProps} />
    </MainContextProider>
  );
}

export default MyApp;
