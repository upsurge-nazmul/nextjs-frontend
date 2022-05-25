import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/portfolio.module.scss";
import Tabs from "../Tabs";
import Holdings from "./Holdings";
import Possessions from "./Possessions";
import Trades from "./Trades";
import PortfolioChart from "./PortfolioChart";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import NoData from "../NoData";

const TABS = [
  { name: "Charts", value: "charts", icon: "Charts" },
  { name: "Possessions", value: "performance", icon: "Possessions History" },
  { name: "Trades", value: "trades", icon: "Trade History" },
];

export default function Portfolio({ userData, token, simulatorType }) {
  const [tab, setTab] = useState(TABS[0].value);
  const [portfolioChartData, setPortfolioChartData] = useState([]);
  const [holdingsData, setHoldingsData] = useState();
  const [records, setRecords] = useState();
  const [performanceData, setPerformanceData] = useState();
  const [tradeData, setTradeData] = useState();

  useEffect(() => {
    async function fetchUserRecords() {
      let recs = await SimulatorApis.getUserRecords({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (recs.data && recs.data.success) {
        setRecords(recs.data.data.rows);
      }
    }
    async function fetchUserStocks() {
      let stcks = await SimulatorApis.getUserStocks({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (stcks.data.success) {
        setPerformanceData(stcks.data.data.rows);
      }
    }
    async function fetchUserTrades() {
      let trds = await SimulatorApis.getUserTrades({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (trds.data.success) {
        setTradeData(trds.data.data.rows);
      }
    }
    async function fetchUserHoldings() {
      let hlds = await SimulatorApis.getUserHoldings({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (hlds.data.success) {
        setHoldingsData(hlds.data.data);
      }
    }
    fetchUserRecords();
    fetchUserStocks();
    fetchUserTrades();
    fetchUserHoldings();
  }, [token]);

  useEffect(() => {
    if (records && records.length) {
      let values = [];
      for (let record of records) {
        values.push([
          new Date(record.date),
          parseFloat(record.current_cash_portfolio) +
            parseFloat(record.current_stock_portfolio),
        ]);
      }
      setPortfolioChartData(values);
    }
  }, [records]);

  return (
    <div className={styles.portfolio}>
      <div className={styles.phoneFooterArea}>
        <Tabs options={TABS} action={setTab} active={tab} shape="square" />
      </div>
      <div className={styles.main}>
        {tab === TABS[0].value && (
          <div className={styles.content}>
            <div className={styles.left}>
              <p className={styles.caption}>Portfolio</p>
              {portfolioChartData && portfolioChartData.length ? (
                <PortfolioChart
                  chartData={portfolioChartData}
                  className={styles.portfolioChart}
                />
              ) : (
                <div className={styles.emptyData}>
                  <NoData
                    size="big"
                    message="You will see your portfolio history once you start trading"
                  />
                </div>
              )}
            </div>
            <div className={styles.right}>
              {holdingsData && (
                <>
                  <p className={styles.caption}>Holdings</p>
                  <div className={styles.holdingsArea}>
                    <div className={styles.holding}>
                      <span className={styles.label}>Current Holdings </span>
                      <span className={styles.value}>
                        ₹{parseFloat(holdingsData[0].amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Holdings
                    chartData={holdingsData}
                    className={styles.holdingsChart}
                  />
                </>
              )}
            </div>
          </div>
        )}
        {tab === TABS[1].value && (
          <Possessions performanceData={performanceData} />
        )}
        {tab === TABS[2].value && <Trades tradesData={tradeData} />}
      </div>
      <div className={styles.footerArea}>
        <Tabs options={TABS} action={setTab} active={tab} shape="square" />
      </div>
    </div>
  );
}
