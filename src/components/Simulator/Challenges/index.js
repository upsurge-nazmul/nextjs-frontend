import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/StockSimulator/challenges.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import MarketUpDown from "./MarketUpDown";
import StockXStockY from "./StockXStockY";
import Topgainer from "./Topgainer";
import BitcoinPriceEst from "./BitcoinPriceEst";

export default function Challenges({ userData, token, simulatorType }) {
  const [stockList, setStockList] = useState();
  const [topComps, setTopComps] = useState();

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
    <div className={styles.stockChallenges}>
      <div className={styles.banerArea}>
        <div className={styles.banerLeft}>
          <div className={styles.banerText}>
          {`Participate in daily challenges to win unicoins & other exciting rewards!`}
          </div>
        </div>
        <div className={styles.banerRight}>
          <div className={styles.banerImage}>
            <Image
              layout="fill"
              objectFit="cover"
              src="https://i.ibb.co/JQSknVG/coinfalling.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={styles.topSection}>
        <Topgainer
          list={stockList}
          currenTops={topComps}
          {...{ token, simulatorType, userData }}
        />
      </div>
      {
        simulatorType === 'cryptosimulator'? (
          <div className={styles.bottomSection}>
          <BitcoinPriceEst {...{ token, simulatorType, userData }} />
        </div>
        ): (
          <div className={styles.bottomSection}>
        <div className={styles.bottomLeft}>
          <MarketUpDown {...{ token, simulatorType, userData }} />
        </div>
        <div className={styles.bottomRight}>
          <StockXStockY {...{ token, simulatorType, userData }} />
        </div>
      </div>
        )
      }
    </div>
  );
}
