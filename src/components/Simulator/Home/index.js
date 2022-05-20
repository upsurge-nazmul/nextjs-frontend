import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/home.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import Holdings from "./Holdings";
import UserStocks from "./UserStocks";
import Chart from "./Chart";
import { getShortForm } from "../../../helpers/shortForms";
import ProfitableStocks from "./ProfitableStocks";

const StockDurations = [
  { name: "Month", value: "monthly" },
  { name: "Week", value: "weekly" },
  { name: "Day", value: "daily" },
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
        let chartData = [];
        for (let item of hlds.data.data) {
          chartData.push({
            id: item.symbol,
            label: item.name,
            value: item.amount,
          });
        }
        setHoldingsChartData(chartData);
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
      let stcks = await SimulatorApis.getUserStocks({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (stcks.data && stcks.data.success) {
        setUserStocks(stcks.data.data.rows);

        let chartsData = [];
        for (let stock of stcks.data.data.rows.slice(0, 2)) {
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
  }, []);

  const getCashHoldingPercentage = () => {
    let currPer = holdingsChartData[0].value;
    return String(((currPer * 100) / 1000000).toFixed(2)) + "%";
  };

  return (
    <div className={styles.home}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <div className={styles.portfolioHoldings}>
            <div className={styles.holdingsTitle}>Portfolio Holdings</div>
            <div className={styles.holdingsChart}>
              <div className={styles.chart}>
                {holdingsChartData ? (
                  <Holdings chartData={holdingsChartData} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {holdingsChartData ? (
            <div className={styles.portfolioInfo}>
              <div className={styles.infoItem}>
                <div className={styles.label}>Total Cash Portfolio</div>
                <div className={styles.value}>{`₹${parseFloat(
                  holdingsChartData[0].value
                ).toFixed(2)}`}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.label}>Total Stock Portfolio</div>
                <div className={styles.value}>{`₹${stockPortfolio.toFixed(
                  2
                )}`}</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.label}>Total Number of Stocks</div>
                <div className={styles.value}>
                  {("0" + String(holdingsChartData.length - 1)).slice(-2)}
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.label}>Remaining Assets</div>
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
            <div className={styles.portfolioOptions}>
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
            {userStocks && userStocks.length
              ? userStocks.map((stock, i) => {
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
                })
              : ""}
          </div>
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
                        {"₹" + parseFloat(data.total_value).toFixed(2)}
                      </div>
                      <div className={styles.name}>{data.name}</div>
                    </div>
                  </div>
                  <Chart
                    chartData={data.data}
                    className={styles.chart}
                    colors={i === 1 ? ["#3699FF"] : ["#F64E60"]}
                  />
                </div>
              );
            })
          ) : (
            <div className={styles.emptySpace}>You do not have any stock</div>
          )}
        </div>
        <div className={styles.bottomRight}>
          <div className={styles.headingArea}>
            <div className={styles.title}>Most Profitable Stocks</div>
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
