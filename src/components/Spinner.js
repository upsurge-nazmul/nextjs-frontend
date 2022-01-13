import React from "react";
import styles from "../styles/GeneralComponents/spinner.module.scss";
export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerInner}>
        <div></div>
      </div>
    </div>
  );
}
