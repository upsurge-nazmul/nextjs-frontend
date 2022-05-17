import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/cryptoChallenges.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import BitcoinPriceEst from "./BitcoinPriceEst";
import Topgainer from "./Topgainer";

export default function CryptoChallenges({ userData, token, simulatorType }) {
  const [cryptoList, setCryptoList] = useState();
  const [topComps, setTopComps] = useState();

  useEffect(() => {
    async function fetchStocks() {
      let stocks = await SimulatorApis.getStocks({
        payload: {},
        token,
        type: simulatorType,
      });
      if (stocks.data && stocks.data.success) {
        setCryptoList(stocks.data.data.rows);
      }
    }
    fetchStocks();
  }, []);

  useEffect(() => {
    async function fetchTopCompanies() {
      setTopComps();
      let comps = await SimulatorApis.getTopCompanies({
        payload: {},
        token,
        type: simulatorType,
        duration: "daily",
      });
      if (comps.data && comps.data.success) {
        setTopComps(comps.data.data.rows);
      }
    }
    fetchTopCompanies();
  }, []);

  return (
    <div className={styles.cryptoChallenges}>
      <div className={styles.topSection}>
        <Topgainer
          list={cryptoList}
          currenTops={topComps}
          {...{ token, simulatorType, userData }}
        />
      </div>
      <div className={styles.bottomSection}>
        <BitcoinPriceEst {...{ token, simulatorType, userData }} />
      </div>
    </div>
  );
}
