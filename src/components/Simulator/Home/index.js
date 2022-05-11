import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/home.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import Holdings from "../Portfolio/Holdings2";
import UserStocks from "./UserStocks";

const StockDurations = [
  { name: "Month", value: "month" },
  { name: "Week", value: "week" },
  { name: "Day", value: "day" },
];

export default function Home({ userData, token, simulatorType }) {
  const [holdingsData, setHoldingsData] = useState();
  const [activeDuration, setActiveDuration] = useState(
    StockDurations[StockDurations.length - 1].value
  );
  const [userStocks, setUserStocks] = useState();
  const [selectedStock, setSelectedStock] = useState("all");

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

  useEffect(() => {
    async function fetchUserStocks() {
      let stcks = await SimulatorApis.getUserStocks({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (stcks.data.success) {
        setUserStocks(stcks.data.data.rows);
      }
    }
    fetchUserStocks();
  }, []);

  //   console.log("@@@@@@@@", holdingsData, userStocks);

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
            <div className={styles.infoItem}>
              <div className={styles.label}>Total Assets Value</div>
              <div className={styles.value}>₹1000</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.label}>Total Assets Value</div>
              <div className={styles.value}>₹1000</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.label}>Total Assets Value</div>
              <div className={styles.value}>₹1000</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.label}>Total Assets Value</div>
              <div className={styles.value}>₹1000</div>
            </div>
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
            <div className={styles.portfolioOptions}>
              {StockDurations.map((duration, i) => {
                return (
                  <div
                    className={
                      duration.value === activeDuration
                        ? styles.activeOption
                        : styles.option
                    }
                    key={i}
                    onClick={() => setActiveDuration(duration.value)}
                  >
                    {duration.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.myStocks}>
            <div
              className={
                selectedStock === "all"
                  ? styles.activeSingleStock
                  : styles.singleStock
              }
              onClick={() => setSelectedStock("all")}
            >
              All Stocks
            </div>
            {userStocks &&
              userStocks.length &&
              userStocks.map((stock, i) => {
                return (
                  <div
                    className={
                      selectedStock === stock.symbol
                        ? styles.activeSingleStock
                        : styles.singleStock
                    }
                    key={i}
                    onClick={() => setSelectedStock(stock.symbol)}
                  >
                    {stock.symbol}
                  </div>
                );
              })}
          </div>
          <div className={styles.topReturns}>
            <UserStocks data={userStocks} />
          </div>
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
