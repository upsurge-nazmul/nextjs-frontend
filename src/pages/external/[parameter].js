import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function ExternalLanding() {
  const router = useRouter();
  const { parameter } = router.query;

  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes("android")) {
      // Operating system is Android
      console.log("Operating system is Android");
      setIsAndroid(true);
    } else {
      // Operating system is not Android
      console.log("Operating system is not Android");
    }
  }, []);

  useEffect(() => {
    if (isAndroid) {
      if (parameter)
        window.location.href = `intent://app/external/${parameter}#Intent;scheme=upsurge;package=com.upsurgefi.app;end`;
    }
  }, [isAndroid, parameter]);

  return (
    <div>
      {!isAndroid ? (
        <div>This page is for Android users only</div>
      ) : (
        <div>Redirecting to app in {parameter} page ...</div>
      )}
    </div>
  );
}

export default ExternalLanding;
