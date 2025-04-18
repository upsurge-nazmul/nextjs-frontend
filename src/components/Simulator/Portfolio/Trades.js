import styles from "../../../styles/StockSimulator/trades.module.scss";
import { getNormalDateFromUtc } from "../../../helpers/timehelpers";
import NoData from "../NoData";
import { toIndianFormat } from "../../../helpers/currency";

export default function Performance({ tradesData = [] }) {
  return (
    <div className={styles.performance}>
      <div className={styles.headingArea}>
        <p className={styles.heading}>Trade History</p>
      </div>
      {tradesData && tradesData.length ? (
        <div className={styles.container}>
          <div className={styles.rows}>
            <div className={styles.headRow}>
              <div className={styles.rowitem}>Date</div>
              <div className={styles.rowitem}>Symbol</div>
              <div className={styles.rowitem}>Trade Type</div>
              <div className={styles.rowitem}>QTY</div>
              <div className={styles.rowitem}>Price</div>
              <div className={styles.rowitem}>Total Cash Value</div>
            </div>
            {tradesData.map((row, index) => {
              return (
                <div className={styles.row} key={index}>
                  <div className={styles.rowitem}>
                    {getNormalDateFromUtc(row.date)}
                  </div>
                  <div className={styles.rowitem}>{row.symbol}</div>
                  <div className={styles.rowitem}>
                    {row.trade_type ? row.trade_type.toUpperCase() : ""}
                  </div>
                  <div className={styles.rowitem}>
                    {parseFloat(row.quantity).toFixed(2)}
                  </div>
                  <div className={styles.rowitem}>
                    {toIndianFormat(parseFloat(row.price))}
                  </div>
                  <div className={styles.rowitem}>
                    {toIndianFormat(parseFloat(row.total_value))}
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
