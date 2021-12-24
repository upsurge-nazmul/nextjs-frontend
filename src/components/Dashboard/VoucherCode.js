import React from "react";
import styles from "../../styles/Dashboard/vouchercode.module.scss";
export default function VoucherCode({ data, setshowcode }) {
  return (
    <div className={styles.vouchercode}>
      <div
        className={styles.background}
        onClick={() => setshowcode(false)}
      ></div>
      <div className={styles.main}>
        <div className={styles.code}>{data.voucherCode}</div>
      </div>
    </div>
  );
}
