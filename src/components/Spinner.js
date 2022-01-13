import React from "react";
import styles from "../styles/GeneralComponents/spinner.module.scss";
export default function Spinner() {
  return (
    <div class={styles.spinner}>
      <div class={styles.spinnerInner}>
        <div></div>
      </div>
    </div>
  );
}
