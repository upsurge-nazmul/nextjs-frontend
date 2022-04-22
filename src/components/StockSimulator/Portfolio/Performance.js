import styles from "../../../styles/StockSimulator/performance.module.scss";

export default function Performance({ performanceData = [] }) {
  return (
    <div className={styles.performance}>
      <div className={styles.headingArea}>
        <p className={styles.heading}>Performance History</p>
      </div>
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
              <div className={styles.row} key={index}>
                <div className={styles.rowitem}>{row.symbol}</div>
                <div className={styles.rowitem}>{row.desc}</div>
                <div className={styles.rowitem}>{row.current_price}</div>
                <div className={styles.rowitem}>{row.purchase_price}</div>
                <div className={styles.rowitem}>{row.qty}</div>
                <div className={styles.rowitem}>{row.total_value}</div>
                <div className={styles.rowitem}>{row.total_gain_}</div>
                <div className={styles.rowitem}>{row.trade_action}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
