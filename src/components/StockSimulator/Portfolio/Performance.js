import styles from "../../../styles/StockSimulator/performance.module.scss";

export default function Performance({ performanceData = [] }) {
  return (
    <div className={styles.performance}>
      <div className={styles.container}>
        <div className={styles.headRow}>
          <div className={styles.rowitem}>Symbol</div>
          <div className={styles.rowitem}>Description</div>
          <div className={styles.rowitem}>Current Price</div>
          <div className={styles.rowitem}>Purchase Price</div>
          <div className={styles.rowitem}>QTY</div>
          <div className={styles.rowitem}>Total Value</div>
          <div className={styles.rowitem}>Total Gain/Loss</div>
          <div className={styles.rowitem}>Trade Actions</div>
        </div>
        <div className={styles.rows}>
          {performanceData.map((row, index) => {
            return (
              <div className={styles.row} key={row.id}>
                <div className={styles.rowitem}>value</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
