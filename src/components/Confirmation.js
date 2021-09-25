import React from "react";
import styles from "../styles/GeneralComponents/confirmation.module.scss";
export default function Confirmation({
  heading,
  onConfirm,
  settoastdata,
  onCancel,
}) {
  return (
    <div className={styles.confirmation}>
      <div className={styles.background} onClick={onCancel}></div>
      <div className={styles.box}>
        <h2>{heading}</h2>
        <div className={styles.wrapper}>
          <div className={styles.close} onClick={onCancel}>
            Close
          </div>
          <div className={styles.confirm} onClick={onConfirm}>
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
}
