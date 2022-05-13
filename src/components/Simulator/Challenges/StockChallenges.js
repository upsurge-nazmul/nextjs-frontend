import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/stockChallenges.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import MarketUpDown from "./MarketUpDown";
import StockXStockY from "./StockXStockY";
import Topgainer from "./Topgainer";

export default function StockChallenges({ userData, token, simulatorType }) {
  const [stockList, setStockList] = useState();

  useEffect(() => {
    async function fetchStocks() {
      let stocks = await SimulatorApis.getStocks({
        payload: {},
        token,
        type: simulatorType,
      });
      if (stocks.data && stocks.data.success) {
        setStockList(stocks.data.data.rows);
      }
    }
    fetchStocks();
  }, []);

  return (
    <div className={styles.stockChallenges}>
      <div className={styles.topSection}>
        <Topgainer list={stockList} />
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.bottomLeft}>
          <MarketUpDown />
        </div>
        <div className={styles.bottomRight}>
          <StockXStockY />
        </div>
      </div>
    </div>
  );
}
