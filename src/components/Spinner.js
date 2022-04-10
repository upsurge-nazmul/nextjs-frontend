import React from "react";
import styles from "../styles/GeneralComponents/spinner.module.scss";
export default function Spinner({ additionalClass, color, topcolor }) {
  return (
    <div className={`${styles.spinner} ${additionalClass}`}>
      <div className={styles.spinnerInner}>
        <div
          style={{
            border: "3px solid " + color || "white",
            borderTopColor: color || "rgb(255, 255, 255)",
            borderTopColor: topcolor || "transparent",
          }}
        ></div>
      </div>
    </div>
  );
}
