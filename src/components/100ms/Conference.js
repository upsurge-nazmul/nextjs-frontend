import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./Peer";
import styles from "../../styles/classroom/conference.module.scss";
import { MainContext } from "../../context/Main";
import { useContext } from "react";
import ConferenceFooter from "./Footer";
function Conference() {
  const peers = useHMSStore(selectPeers);
  const { theme } = useContext(MainContext);
  return (
    <div className={`${styles.main} ${theme == "dark" && styles.darkmain}`}>
      <h2 className={styles.heading}>Conference</h2>
      <div className="peers-container">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
      <ConferenceFooter />
    </div>
  );
}

export default Conference;
