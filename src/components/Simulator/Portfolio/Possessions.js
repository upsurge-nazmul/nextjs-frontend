import styles from "../../../styles/StockSimulator/possessions.module.scss";
import NoData from "../NoData";

export default function Possessions({ performanceData = [] }) {
  return (
    <div className={styles.performance}>
      <div className={styles.headingArea}>
        <p className={styles.heading}>Possessions History</p>
      </div>
      {performanceData && performanceData.length ? (
        <div className={styles.container}>
          <div className={styles.rows}>
            <div className={styles.headRow}>
              <div className={styles.rowitem}>Name</div>
              <div className={styles.rowitem}>Symbol</div>
              <div className={styles.rowitem}>Current Price</div>
              <div className={styles.rowitem}>Purchase Price</div>
              <div className={styles.rowitem}>QTY</div>
              <div className={styles.rowitem}>Total Value</div>
              <div className={styles.rowitem}>Total Gain/Loss</div>
            </div>
            {performanceData.map((row, index) => {
              return (
                <div className={styles.row} key={index}>
                  <div className={styles.rowitem}>{row.name}</div>
                  <div className={styles.rowitem}>{row.symbol}</div>
                  <div className={styles.rowitem}>
                    {parseFloat(row.current_price).toFixed(2)}
                  </div>
                  <div className={styles.rowitem}>
                    {parseFloat(row.buying_price).toFixed(2)}
                  </div>
                  <div className={styles.rowitem}>
                    {parseFloat(row.quantity).toFixed(2)}
                  </div>
                  <div className={styles.rowitem}>
                    {parseFloat(row.total_value).toFixed(2)}
                  </div>
                  <div className={styles.rowitem}>
                    {parseFloat(row.total_gain).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.emptyData}>
          <NoData />
        </div>
      )}
    </div>
  );
}
