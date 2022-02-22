import React from "react";
import styles from "../../styles/MoneyAce/passbook.module.scss";

export default function PassBook() {
  return (
    <div className={styles.passbook}>
      <div className={styles.main}>
        <div className={styles.bg}>
          <div className={styles.content}>
            <p className={styles.heading}>Passbook</p>
            <div className={styles.wrapper}>
              <div className={styles.hrow}>
                <p>Date</p>
                <p>Particulars</p>
                <p className={styles.debitcred}>
                  <span className={styles.debt}>Debit</span> /{" "}
                  <span className={styles.cred}>Credit</span>
                  {` (₹)`}
                </p>
                <p>{`Balance(₹)`}</p>
              </div>
              <div className={styles.row}>
                <p>22/02/2022</p>
                <p>Zomato</p>
                <p>500</p>
                <p>2500</p>
              </div>
            </div>
          </div>
        </div>
        <img src="/images/backgrounds/mobile.png" alt="" />
      </div>
    </div>
  );
}
