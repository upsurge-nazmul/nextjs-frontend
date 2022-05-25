import styles from "../../../styles/StockSimulator/companyInfo.module.scss";
import { toIndianFormat } from "../../../helpers/currency";

export default function CompanyInfo({ companyInfo }) {
  return (
    <div className={styles.companyInfo}>
      {companyInfo && (
        <div className={styles.infoArea}>
          <div className={styles.volumeArea}>
            <span className={styles.volumeTitle}>Volume</span>
            <span className={`${styles.volumeValue} ${styles.greenText}`}>
              {toIndianFormat(parseFloat(companyInfo.volume))}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>Open</span>
            <span className={styles.greenText}>
              {toIndianFormat(parseFloat(companyInfo.open))}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>Close</span>
            <span className={styles.redText}>
              {toIndianFormat(parseFloat(companyInfo.close))}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>High</span>
            <span className={styles.greenText}>
              {toIndianFormat(parseFloat(companyInfo.high))}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>Low</span>
            <span className={styles.redText}>
              {toIndianFormat(parseFloat(companyInfo.low))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
