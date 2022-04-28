import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/portfolio.module.scss";
import Tabs from "../Tabs";
// import Holdings from "./Holdings";
import Performance from "./Performance";
import Trades from "./Trades";
import PortfolioChart from "./PortfolioChart";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

const TABS = [
  { name: "Charts", value: "charts", icon: "Charts" },
  { name: "Performance", value: "performance", icon: "Performance History" },
  { name: "Trades", value: "trades", icon: "Trades History" },
];

export default function Portfolio({ userData, token }) {
  const [tab, setTab] = useState(TABS[0].value);
  const [portfolioChartData, setPortfolioChartData] = useState();
  const [records, setRecords] = useState();
  const [performanceData, setPerformanceData] = useState();
  const [tradeData, setTradeData] = useState();

  useEffect(() => {
    async function fetchUserRecords() {
      let recs = await SimulatorApis.getUserRecords({
        payload: { user_id: userData.user_id },
        token,
      });
      if (recs.data.success) {
        setRecords(recs.data.data.rows);
      }
    }
    async function fetchUserStocks() {
      let stcks = await SimulatorApis.getUserStocks({
        payload: { user_id: userData.user_id },
        token,
      });
      if (stcks.data.success) {
        setPerformanceData(stcks.data.data.rows);
      }
    }
    async function fetchUserTrades() {
      let trds = await SimulatorApis.getUserTrades({
        payload: { user_id: userData.user_id },
        token,
      });
      if (trds.data.success) {
        setTradeData(trds.data.data.rows);
      }
    }
    fetchUserRecords();
    fetchUserStocks();
    fetchUserTrades();
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
      <div className={styles.main}>
        {tab === TABS[0].value && (
          <div className={styles.content}>
            {portfolioChartData && portfolioChartData.length && (
              <div className={styles.left}>
                <p className={styles.caption}>Portfolio</p>
                <PortfolioChart chartData={portfolioChartData} width="100%" />
              </div>
            )}
            {/* <div className={styles.right}>
              <p className={styles.caption}>Holdings</p>
              <Holdings userData={UserData} />
            </div> */}
          </div>
        )}
        {tab === TABS[1].value && (
          <Performance performanceData={performanceData} />
        )}
        {tab === TABS[2].value && <Trades tradesData={tradeData} />}
      </div>
      <div className={styles.footerArea}>
        <Tabs options={TABS} action={setTab} active={tab} shape="square" />
      </div>
    </div>
  );
}
