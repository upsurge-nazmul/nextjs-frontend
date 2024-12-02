import { useEffect } from "react";

const AdSenseAd = () => {
  const isLocalhost =
    typeof window !== "undefined" && window.location.hostname === "localhost";

  useEffect(() => {
    if (!isLocalhost) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [isLocalhost]);

  if (isLocalhost) {
    return (
      <div
        style={{
          width: "300px",
          height: "250px",
          backgroundColor: "#ddd",
          color: "#555",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px dashed #999",
        }}
      >
        Ad Placeholder
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "300px", height: "250px" }}
        data-ad-client="ca-pub-2998049897534895"
        data-ad-slot="9188823442"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseAd;
