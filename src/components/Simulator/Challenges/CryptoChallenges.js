import styles from "../../../styles/StockSimulator/cryptoChallenges.module.scss";
import BitcoinPriceEst from "./BitcoinPriceEst";
import Topgainer from "./Topgainer";

export default function CryptoChallenges({ userData, token, simulatorType }) {
  return (
    <div className={styles.cryptoChallenges}>
      <div className={styles.topSection}>
        <Topgainer />
      </div>
      <div className={styles.bottomSection}>
        <BitcoinPriceEst />
      </div>
    </div>
  );
}
