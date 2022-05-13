import styles from "../../../styles/StockSimulator/stockChallenges.module.scss";
import MarketUpDown from "./MarketUpDown";
import StockXStockY from "./StockXStockY";
import Topgainer from "./Topgainer";

export default function StockChallenges({ userData, token, simulatorType }) {
  return (
    <div className={styles.stockChallenges}>
      <div className={styles.topSection}>
        <Topgainer />
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
