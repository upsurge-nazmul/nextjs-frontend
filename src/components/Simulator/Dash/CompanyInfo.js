import styles from "../../../styles/StockSimulator/companyInfo.module.scss";
import { toIndianFormat } from "../../../helpers/currency";
import Info from "../Info";

export default function CompanyInfo({ companyInfo }) {
  return (
    <div className={styles.companyInfo}>
      {companyInfo && (
        <div className={styles.infoArea}>
          <div className={styles.volumeArea}>
            <span className={styles.volumeTitle}>
              Volume{" "}
              <Info
                text={
                  "It is the total number of stocks that were traded of a particular company in a trading session (for ex- 200 BPCL stocks were sold from A to B and B sold the same 200 stocks to C and at a later time in the same trading session C sold the 200 stocks back to A. Only these trades happened for BPCL in this session then in that case volume of BPCL stock is 200+200+200 = 600)"
                }
              />
            </span>
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
