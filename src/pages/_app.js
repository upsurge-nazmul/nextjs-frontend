import { MainContextProider } from "../context/Main";
import "../styles/globals.scss";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    let localStorageTimeout = 15 * 1000; // 15,000 milliseconds = 15 seconds.
    let localStorageResetInterval = 10 * 1000; // 10,000 milliseconds = 10 seconds.
    let localStorageTabKey = "upsurge-tab-key";
    let sessionStorageGuidKey = "upsurge-tab-guid";

    function createGUID() {
      let guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        (c) => {
          /*eslint-disable*/
          let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          /*eslint-enable*/
          return v.toString(16);
        }
      );

      return guid;
    }

    function testTab() {
      let sessionGuid =
        sessionStorage.getItem(sessionStorageGuidKey) || createGUID();
      let tabObj = JSON.parse(localStorage.getItem(localStorageTabKey)) || null;

      sessionStorage.setItem(sessionStorageGuidKey, sessionGuid);

      if (
        tabObj === null ||
        tabObj.timestamp < new Date().getTime() - localStorageTimeout ||
        tabObj.guid === sessionGuid
      ) {
        function setTabObj() {
          let newTabObj = {
            guid: sessionGuid,
            timestamp: new Date().getTime(),
          };
          localStorage.setItem(localStorageTabKey, JSON.stringify(newTabObj));
        }
        setTabObj();
        setInterval(setTabObj, localStorageResetInterval);
        return true;
      } else {
        // An active tab is already open that does not match our session guid.
        return false;
      }
    }

    if (!testTab()) {
      window.close();
    }
  }, []);
  return (
    <MainContextProider>
      <Component {...pageProps} />
    </MainContextProider>
  );
}

export default MyApp;
