import { useEffect } from "react";

const AdSenseAd = ({ height = "150px", width = "100%" }) => {
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
          width: width,
          height: height,
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
        style={{ display: "block", width: width, height: height }}
        data-ad-client="ca-pub-2998049897534895"
        data-ad-slot="4096745458"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseAd;
