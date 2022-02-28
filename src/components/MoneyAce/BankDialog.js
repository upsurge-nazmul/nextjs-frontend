import React from "react";
import styles from "../../styles/MoneyAce/bankdialog.module.scss";
export default function BankDialog({ data }) {
  const { title, onChange, value, btntext } = data;
  return (
    <div className={styles.bankdialog}>
      <div className={styles.background} />
      <div className={styles.main}>
        <p className={styles.heading}>{title}</p>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter amount"
        />
        <p className={styles.submit}>{btntext || "Continue"}</p>
      </div>
    </div>
  );
}
