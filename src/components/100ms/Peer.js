import { useVideo } from "@100mslive/react-sdk";
import { useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/classroom/peer.module.scss";

function Peer({ peer }) {
  const { theme } = useContext(MainContext);

  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <div className={`${styles.main} ${theme === "dark" && styles.darkmain}`}>
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div className={styles.name}>
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
