import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/StockSimulator/challenges.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import MarketUpDown from "./MarketUpDown";
import StockXStockY from "./StockXStockY";
import Topgainer from "./Topgainer";
import BitcoinPriceEst from "./BitcoinPriceEst";
import NoData from "../NoData";

export default function Challenges({ userData, token, simulatorType }) {
  const [stockList, setStockList] = useState();
  const [topComps, setTopComps] = useState();
  const [active, setActive] = useState(false);

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

  useEffect(() => {
    /**
     * Monday to Friday
     * Everyday, 3.30 pm to next day 9 am
     * 24 hrs format, 15.30 to next day 09.00
     * UTC 10.00 to next day 3.30
     */
    let today = new Date();
    let day = today.getDay();
    let hour = today.getUTCHours();
    let minutes = today.getUTCMinutes();
    let time = parseInt(hour) + parseFloat(((minutes / 60) * 100) / 100); // time in minute percentage; like half past ten, or quarter to 10

    if (day >= 1 && day <= 5) {
      // Monday to Friday
      if (time >= 10 || time <= 3.5) {
        // after 10 and before 3.30
        setActive(true);
      }
    }
    console.log(active, hour, minutes, time);
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
              src="https://imgcdn.upsurge.in/images/coinfalling.png"
              alt=""
            />
          </div>
        </div>
      </div>
      {active ? (
        <>
          <div className={styles.topSection}>
            <Topgainer
              list={stockList}
              currenTops={topComps}
              {...{ token, simulatorType, userData, active }}
            />
          </div>
          {simulatorType === "cryptosimulator" ? (
            <div className={styles.bottomSection}>
              <BitcoinPriceEst
                {...{ token, simulatorType, userData, active }}
              />
            </div>
          ) : (
            <div className={styles.bottomSection}>
              <div className={styles.bottomLeft}>
                <MarketUpDown {...{ token, simulatorType, userData, active }} />
              </div>
              <div className={styles.bottomRight}>
                <StockXStockY {...{ token, simulatorType, userData, active }} />
              </div>
            </div>
          )}
        </>
      ) : (
        <NoData
          message={
            "You can participate in challenges before 9am and after 3.30pm every Monday to Friday"
          }
        />
      )}
    </div>
  );
}
