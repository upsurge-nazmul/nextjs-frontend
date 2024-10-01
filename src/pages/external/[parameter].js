import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/External/style.module.scss";

function ExternalLanding() {
  const router = useRouter();
  const { parameter } = router.query;

  const [isAndroid, setIsAndroid] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  useEffect(() => {
    if (window?.navigator?.userAgent) {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes("android")) {
        setIsAndroid(true);
        if (parameter) {
          const appUrl = `intent://app/external/${parameter}#Intent;scheme=upsurge;package=com.upsurgefi.app;end`;
          // const appUrl = `intent://app/external/${parameter}#Intent;scheme=upsurge;package=com.upsurgefi.app;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.upsurgefi.app;end`;

          // Try to open the app
          window.location.href = appUrl;

          // After 2 seconds, show the download button if the app hasn't opened
          setTimeout(() => {
            setShowDownloadButton(true);
          }, 2000); // Adjust this delay as needed
        }
      } else {
        window.location.href = "/";
      }
    }
  }, [parameter]);

  return (
    <div className={styles.externalPage}>
      {!isAndroid ? (
        <div className={styles.mainContent}>
          <div className={styles.mainText}>
            This page is for Android users only
          </div>
          <a href="/">
            <button className={styles.redirectButton}>Go to homepage</button>
          </a>
        </div>
      ) : (
        <div className={styles.mainContent}>
          <div className={styles.mainText}>
            Attempting to open the app for{" "}
            <span className={styles.pageName}>{parameter}</span>...
          </div>
          {showDownloadButton && (
            <div className={styles.downloadButtonArea}>
              <p className={styles.downloadButtonText}>
                If the app doesn't open, you can download it here:
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.upsurgefi.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.redirectButton}>
                  Download from Play Store
                </button>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ExternalLanding;
