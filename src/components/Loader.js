import React from "react";
import styles from "../styles/GeneralComponents/loader.module.scss";
export default function Loader({ progress }) {
  return (
    <div className={styles.loader}>
      <div className={styles.progress} style={{ width: progress }}></div>
    </div>
  );
}
