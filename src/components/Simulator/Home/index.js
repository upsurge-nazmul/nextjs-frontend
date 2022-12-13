import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/home.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import Holdings from "./Holdings";
import UserStocks from "./UserStocks";
import Chart from "./Chart";
import { getShortForm } from "../../../helpers/shortForms";
import ProfitableStocks from "./ProfitableStocks";
import NoData from "../NoData";
import { toIndianFormat } from "../../../helpers/currency";

const StockDurations = [
  { name: "This Month", value: "monthly" },
  { name: "This Week", value: "weekly" },
  { name: "Today", value: "daily" },
];

export default function Home({
  userData,
  token,
  simulatorType,
  setSelectedSymbol,
}) {
  const [holdingsChartData, setHoldingsChartData] = useState();
  const [activePortfDuration, setActivePortfDuration] = useState(
    StockDurations[StockDurations.length - 1].value
  );
  const [activeProfitableDuration, setActiveProfitableDuration] = useState(
    StockDurations[StockDurations.length - 1].value
  );
  const [userStocks, setUserStocks] = useState();
  const [selectedStock, setSelectedStock] = useState("all");
  const [chartData, setChartData] = useState();
  const [stockPortfolio, setStockPortfolio] = useState(0);
  const [lastUpdated, setLastUpdated] = useState();

  useEffect(() => {
    async function fetchUserHoldings() {
      let hlds = await SimulatorApis.getUserHoldings({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (hlds.data && hlds.data.success) {
        setHoldingsChartData(hlds.data.data);
      }
      let otherItems =
        hlds.data && hlds.data.data.slice(1, hlds.data.data.length);
      let otherSum = otherItems
        ? otherItems.reduce((acc, cur) => acc + cur.amount, 0)
        : 0;
      setStockPortfolio(otherSum);
    }
    fetchUserHoldings();
  }, []);

  useEffect(() => {
    async function fetchUserStocks() {
      let comps = await SimulatorApis.getTopUserCompanies({
        payload: {
          user_id: userData.user_id,
          max: 3,
        },
        token,
        type: simulatorType,
        duration: "daily",
      });
      if (
        comps.data &&
        comps.data.success &&
        comps.data.data &&
        comps.data.data.length
      ) {
        let topComps = comps.data.data;
        setUserStocks(topComps);
      }
    }
    async function fetchMostValuableStocks() {
      let stcks = await SimulatorApis.getUserMostValuableStocks({
        payload: { user_id: userData.user_id, max: 2 },
        token,
        type: simulatorType,
      });
      if (stcks.data && stcks.data.success) {
        let chartsData = [];
        for (let stock of stcks.data.data) {
          let values = [];
          for (let item of stock.history) {
            let xAxisValue = new Date(item.date);
            values.push({
              x: xAxisValue,
              y: parseFloat(item.close),
            });
          }
          chartsData.push({
            name: stock.name,
            symbol: stock.symbol,
            total_value: stock.total_value,
            data: values,
          });
        }
        setChartData(chartsData);
      }
    }
    fetchUserStocks();
    fetchMostValuableStocks();
  }, []);

  const getCashHoldingPercentage = () => {
    let currPer = holdingsChartData[0].amount;
    return String(((currPer * 100) / 1000000).toFixed(2)) + "%";
  };

  return (
    <div className={styles.home}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <div className={styles.portfolioHoldings}>
            <div className={styles.holdingsTitle}>Portfolio Holdings</div>
            <div className={styles.holdingsChart}>
              {holdingsChartData ? (
                <Holdings
                  chartData={holdingsChartData}
                  className={styles.chart}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          {holdingsChartData ? (
            <div className={styles.portfolioInfo}>
              <div className={styles.infoItem}>
                <div className={styles.label}>Total Cash Portfolio</div>
                <div className={styles.value}>{`₹${toIndianFormat(
                  holdingsChartData[0].amount
                )}`}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.label}>
                  Total
                  {simulatorType === "cryptosimulator" ? " Crypto " : " Stock "}
                  Portfolio
                </div>
                <div className={styles.value}>{`₹${toIndianFormat(
                  stockPortfolio
                )}`}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.label}>
                  Total Number of{" "}
                  {simulatorType === "cryptosimulator" ? " coins " : " stocks "}
                </div>
                <div className={styles.value}>
                  {("0" + String(holdingsChartData.length - 1)).slice(-2)}
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.label}>Remaining Cash</div>
                <div className={styles.value}>{getCashHoldingPercentage()}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.topRight}>
          <div className={styles.portfolioHeadingSection}>
            <div className={styles.portfolioHeading}>
              <div className={styles.heading}>Your Portfolio</div>
              <div className={styles.subHeading}>
                Last Updated at {lastUpdated}
              </div>
            </div>
            {/* <div className={styles.portfolioOptions}>
              {StockDurations.map((duration, i) => {
                return (
                  <div
                    className={
                      duration.value === activePortfDuration
                        ? styles.activeOption
                        : styles.option
                    }
                    key={i}
                    onClick={() => setActivePortfDuration(duration.value)}
                  >
                    {duration.name}
                  </div>
                );
              })}
            </div> */}
          </div>
          {userStocks && userStocks.length ? (
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
              {userStocks.map((stock, i) => {
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
          ) : (
            <NoData
              size="small"
              message={`You have no ${
                simulatorType === "cryptosimulator" ? "coin" : "stock"
              } yet`}
            />
          )}
          <div className={styles.topReturns}>
            <UserStocks
              userData={userData}
              token={token}
              simulatorType={simulatorType}
              duration={activePortfDuration}
              selected={selectedStock}
              setLastUpdated={setLastUpdated}
              setSelectedSymbol={setSelectedSymbol}
            />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
          {chartData && chartData.length ? (
            chartData.map((data, i) => {
              return (
                <div key={i} className={styles.chartArea}>
                  <div className={styles.chartInfo}>
                    <div className={styles.icon}>{getShortForm(data.name)}</div>
                    <div className={styles.nameArea}>
                      <div className={styles.value}>
                        {"₹" + toIndianFormat(data.total_value)}
                      </div>
                      <div className={styles.name}>{data.name}</div>
                    </div>
                  </div>
                  <Chart
                    chartData={data.data}
                    className={styles.chart}
                    colors={i === 1 ? ["#4166EB"] : ["#17d1bc"]}
                  />
                </div>
              );
            })
          ) : (
            <div className={styles.emptySpace}>
              <NoData
                size="medium"
                message={`Please buy ${
                  simulatorType === "cryptosimulator" ? "coins" : "stocks"
                } to see history chart`}
              />
            </div>
          )}
        </div>
        <div className={styles.bottomRight}>
          <div className={styles.headingArea}>
            <div className={styles.title}>
              Most Profitable{" "}
              {simulatorType === "cryptosimulator" ? "Coins" : "Stocks"}
            </div>
            <div className={styles.profitableStocksOptions}>
              {StockDurations.map((duration, i) => {
                return (
                  <div
                    className={
                      duration.value === activeProfitableDuration
                        ? styles.activeOption
                        : styles.option
                    }
                    key={i}
                    onClick={() => setActiveProfitableDuration(duration.value)}
                  >
                    {duration.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.cards}>
            <ProfitableStocks
              token={token}
              simulatorType={simulatorType}
              duration={activeProfitableDuration}
              setSelectedSymbol={setSelectedSymbol}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
