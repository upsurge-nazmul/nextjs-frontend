// pages/ExternalLanding.js

import { useRouter } from "next/router";
import { useEffect } from "react";

function ExternalLanding() {
  const router = useRouter();
  const { parameter } = router.query;

  // const checkAndRedirect = async () => {
  //   const userAgent = navigator.userAgent.toLowerCase();

  //   // Check if the user is on an Android device
  //   const isAndroid = userAgent.includes("android");

  //   if (isAndroid) {
  //     // Check if the app is installed by trying to open a custom URL scheme
  //     const appScheme = "upsurge://";
  //     const deeplink = `upsurge://app/external/${parameter}`;
  //     const playStoreURL =
  //       "https://play.google.com/store/apps/details?id=com.upsurgefi.app";

  //     const checkAppInstalled = new Image();
  //     checkAppInstalled.src = appScheme;
  //     checkAppInstalled.onload = () => {
  //       console.log("App is installed");
  //       // Open the app using the custom URL scheme
  //       window.location.href = deeplink;
  //     };
  //     checkAppInstalled.onerror = () => {
  //       console.log("App is not installed");
  //       // Open the Play Store
  //       window.location.href = playStoreURL;
  //     };
  //   }
  // };

  // const checkAndRedirect = async () => {
  //   const userAgent = navigator.userAgent.toLowerCase();

  //   // Check if the user is on an Android device
  //   const isAndroid = userAgent.includes("android");

  //   if (isAndroid) {
  //     // Check if the app is installed by trying to open a custom URL scheme
  //     const appScheme = "upsurge://";
  //     const deeplink = `upsurge://app/external/${parameter}`;
  //     const playStoreURL =
  //       "https://play.google.com/store/apps/details?id=com.upsurgefi.app";

  //     setTimeout(function () {
  //       window.location.href = deeplink;

  //       // If the page hasn't changed, the app is not installed
  //       if (document.hidden) {
  //         // Redirect to the Play Store
  //         window.location.href = playStoreURL;
  //       }
  //     }, 1000);
  //   }
  // };

  // useEffect(() => {
  //   // Define the deep link URL
  //   const deepLinkURL =
  //     "intent://app/external/games#Intent;scheme=upsurge;package=com.upsurgefi.app;end";

  //   // Simulate a click on a hidden link to trigger the deep link
  //   const hiddenLink = document.createElement("a");
  //   hiddenLink.href = deepLinkURL;
  //   hiddenLink.style.display = "none";
  //   document.body.appendChild(hiddenLink);
  //   hiddenLink.click();
  //   document.body.removeChild(hiddenLink);
  // }, []);

  useEffect(() => {
    // router.push(
    //   "intent://app/external/games#Intent;scheme=upsurge;package=com.upsurgefi.app;end"
    // );
    // window.location.href =
    //   "intent://app/external/games#Intent;scheme=upsurge;package=com.upsurgefi.app;end";
    if (parameter)
      window.location.href = `intent://app/external/${parameter}#Intent;scheme=upsurge;package=com.upsurgefi.app;end`;
  }, [parameter]);

  return <div>{parameter}</div>;
}

export default ExternalLanding;
