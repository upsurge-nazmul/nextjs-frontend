import styles from "../../../styles/StockSimulator/portfolioDescription.module.scss";

export default function Description({ userData }) {
  return (
    <div className={styles.description}>
      <div className={styles.descriptionItem}>
        <span className={styles.label}>Total Assets Value</span>
        <span className={styles.value}>{userData.total_asset_value}</span>
      </div>
      <div className={styles.descriptionItem}>
        <span className={styles.label}>Active Since</span>
        <span className={styles.value}>{userData.joining_date}</span>
      </div>
      <div className={styles.descriptionItem}>
        <span className={styles.label}>Web3 Ranking</span>
        <span className={styles.value}>{userData.web3_ranking}</span>
      </div>
      <div className={styles.descriptionItem}>
        <span className={styles.label}>% Change (FY 2022)</span>
        <span className={styles.value}>{userData.change_in_percent}</span>
      </div>
    </div>
  );
}
