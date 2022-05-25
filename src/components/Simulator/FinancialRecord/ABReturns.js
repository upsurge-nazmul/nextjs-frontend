import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/abReturns.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

export default function ABReturns({ token, company }) {
  const [abReturns, setAbReturns] = useState([]);

  useEffect(() => {
    async function fetchAbReturns() {
      let abReturns = await SimulatorApis.getAlphaBetaReturns({
        payload: {
          symbol: company.symbol,
        },
        token,
      });
      if (abReturns.data.success) {
        let values = abReturns.data.data.rows.reverse();
        setAbReturns(values);
      }
    }
    if (company) {
      fetchAbReturns();
    }
  }, [company]);

  const formattedFloat = (val) => {
    return val ? parseFloat(val).toFixed(2) : "-";
  };

  return (
    <div className={styles.abReturns}>
      <div className={styles.container}>
        <div className={styles.rows}>
          <div className={styles.headRow}>
            {/* <div className={styles.rowitem}>Name</div> */}
            {/* <div className={styles.rowitem}>Symbol</div> */}
            <div className={styles.rowitem}>Properties</div>
            <div className={styles.rowitem}>Beta against Nifty</div>
            <div className={styles.rowitem}>Alpha against Nifty</div>
            <div className={styles.rowitem}>Beta against NSE 200</div>
            <div className={styles.rowitem}>Alpha against NSE 200</div>
            <div className={styles.rowitem}>Beta against Sensex</div>
            <div className={styles.rowitem}>Alpha against Sensex</div>
            <div className={styles.rowitem}>Stock Returns</div>
          </div>
          {abReturns.map((row, index) => {
            return (
              <div className={styles.row} key={index}>
                {/* <div className={styles.rowitem}>{row.name}</div> */}
                {/* <div className={styles.rowitem}>{row.symbol}</div> */}
                <div className={styles.rowitem}>{row.duration}</div>
                <div className={styles.rowitem}>
                  {formattedFloat(row.beta_against_nifty)}
                </div>
                <div className={styles.rowitem}>
                  {formattedFloat(row.alpha_against_nifty)}
                </div>
                <div className={styles.rowitem}>
                  {formattedFloat(row.beta_against_nse_200)}
                </div>
                <div className={styles.rowitem}>
                  {formattedFloat(row.alpha_against_nse_200)}
                </div>
                <div className={styles.rowitem}>
                  {formattedFloat(row.beta_against_sensex)}
                </div>
                <div className={styles.rowitem}>
                  {formattedFloat(row.alpha_against_sensex)}
                </div>
                <div className={styles.rowitem}>
                  {formattedFloat(row.stock_returns)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
