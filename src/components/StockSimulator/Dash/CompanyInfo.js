import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/companyInfo.module.scss";

export default function CompanyInfo({ companyInfo }) {
  return (
    <div className={styles.companyInfo}>
      {companyInfo && (
        <div className={styles.infoArea}>
          <div className={styles.volumeArea}>
            <span className={styles.volumeTitle}>Volume</span>
            <span className={`${styles.volumeValue} ${styles.greenText}`}>
              {"$" + parseFloat(companyInfo.volume).toFixed(2)}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>O</span>
            <span className={styles.greenText}>
              {parseFloat(companyInfo.open).toFixed(2)}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>H</span>
            <span className={styles.redText}>
              {parseFloat(companyInfo.high).toFixed(2)}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>L</span>
            <span className={styles.redText}>
              {parseFloat(companyInfo.low).toFixed(2)}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>C</span>
            <span className={styles.redText}>
              {parseFloat(companyInfo.close).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
