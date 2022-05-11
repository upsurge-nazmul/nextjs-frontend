import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/home.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import Holdings from "../Portfolio/Holdings2";

export default function Home({ userData, token, simulatorType }) {
  const [holdingsData, setHoldingsData] = useState();

  useEffect(() => {
    async function fetchUserHoldings() {
      let hlds = await SimulatorApis.getUserHoldings({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (hlds.data.success) {
        let chartData = [];
        let fs = [];
        for (let item of hlds.data.data) {
          chartData.push({
            id: item.symbol,
            label: item.name,
            value: item.amount,
          });
        }
        setHoldingsData(chartData);
      }
    }
    fetchUserHoldings();
  }, []);

  console.log("@@@@@@@@", holdingsData);

  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <div className={styles.topLeft}>
          <div className={styles.portfolioHoldings}>
            <div className={styles.holdingsTitle}>Portfolio Holdings</div>
            {holdingsData && (
              <Holdings
                chartData={holdingsData}
                className={styles.holdingsChart}
                legendPosition={"right"}
              />
            )}
          </div>
          <div className={styles.portfolioInfo}>
            <div className={styles.portfolioInfo1}>Info 1</div>
            <div className={styles.portfolioInfo2}>Info 2</div>
            <div className={styles.portfolioInfo3}>Info 3</div>
            <div className={styles.portfolioInfo4}>Info 4</div>
          </div>
        </div>
        <div className={styles.bottomLeft}>
          <div className={styles.firstChart}>Chart 1</div>
          <div className={styles.secondChart}>Chart 2</div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.topRight}>
          <div className={styles.portfolioHeadingSection}>
            <div className={styles.portfolioHeading}>
              <div className={styles.heading}>You Portfolio</div>
              <div className={styles.subHeading}>Last Updated...</div>
            </div>
            <div className={styles.portfolioOptions}>Options</div>
          </div>
          <div className={styles.myStocks}>List of my stocks</div>
          <div className={styles.topReturns}>Top Return Stocks</div>
        </div>
        <div className={styles.bottomRight}>
          <div className={styles.follwoingTitle}>People You're following</div>
          <div className={styles.follwingCards}>
            <div>Card 1</div>
            <div>Card 2</div>
            <div>Card 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}
