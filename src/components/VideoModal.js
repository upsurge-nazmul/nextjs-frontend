import React from "react";
import styles from "../styles/GeneralComponents/videomodal.module.scss";
export default function VideoModal({ source, onBack }) {
  return (
    <div className={styles.videomodal}>
      <div className={styles.background} onClick={onBack}></div>
      <div className={styles.main}>
        <video src={source} controls autoPlay />
      </div>
    </div>
  );
}
