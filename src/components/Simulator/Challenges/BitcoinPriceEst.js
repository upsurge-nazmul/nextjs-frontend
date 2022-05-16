import { useState, useEffect } from "react";
import styles from "../../../styles/StockSimulator/bitcoinPriceEst.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import { getDateRange } from "../../../helpers/timehelpers";
import Chart from "../Home/Chart";

export default function BitcoinPriceEst({ token, simulatorType }) {
  const [bitcoinData, setBitcoinData] = useState();
  const [estValue, setEstValue] = useState();

  useEffect(() => {
    async function fetchBitcoinHist() {
      let btcHist = await SimulatorApis.getStocks({
        payload: {
          from: getDateRange("6 Months").from,
          to: getDateRange("6 Months").to,
          symbol: "BTC",
        },
        token,
        type: simulatorType,
      });
      if (btcHist.data && btcHist.data.success) {
        let values = [];
        for (let item of btcHist.data.data.rows) {
          let xAxisValue = new Date(item.date);
          values.push({
            x: xAxisValue,
            y: parseFloat(item.close),
          });
        }
        setBitcoinData(values);
      }
    }
    fetchBitcoinHist();
  }, [token]);

  const handleConfirm = (e) => {
    e.preventDefault();
    console.log("confirmed estimated value", estValue);
  };

  return (
    <div className={styles.bitcoinPriceEst}>
      <div className={styles.topSection}>
        <div className={styles.titleArea}>
          <div className={styles.title}>Bitcoin Price Estimate</div>
          <button className={styles.infoButton}>i</button>
        </div>
        <div className={styles.description}>
          Sed morbi pulvinar ornare gravida. Pulvinar turpis pellentesque
          porttitor nec phasellus justo, viverra. Duis varius risus, in tellus.
          In enim tincidunt nulla.
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.bottomLeft}>
          {bitcoinData && (
            <Chart
              chartData={bitcoinData}
              className={styles.chart}
              colors={["#F64E60"]}
              chartName="Close"
            />
          )}
        </div>
        <div className={styles.bottomRight}>
          <form onSubmit={(e) => handleConfirm(e)} className={styles.estForm}>
            <div className={styles.label}>Estimated Price</div>
            <input
              value={estValue}
              onChange={(e) => setEstValue(e.target.value)}
              className={styles.value}
              type="number"
              placeholder="eg: 58.34"
            />
            <div className={styles.actionArea}>
              <button
                onClick={(e) => handleConfirm(e)}
                className={styles.action}
                type="submit"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
