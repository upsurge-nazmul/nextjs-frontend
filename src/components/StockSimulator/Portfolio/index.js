import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/portfolio.module.scss";
import Tabs from "../Tabs";
import Holdings from "./Holdings";
import Performance from "./Performance";
import Trades from "./Trades";
import PortfolioChart from "./PortfolioChart";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

const TABS = [
  { name: "Charts", value: "charts", icon: "Charts" },
  { name: "Performance", value: "performance", icon: "Performance History" },
  { name: "Trades", value: "trades", icon: "Trades History" },
];

export default function Portfolio({ UserData, userData, token }) {
  const [tab, setTab] = useState(TABS[0].value);
  const [portfolioChartData, setPortfolioChartData] = useState();
  const [records, setRecords] = useState();
  const [performanceData, setPerformanceData] = useState();
  const [tradeData, setTradeData] = useState();

  useEffect(() => {
    let values = [];
    for (let i = 0; i < 30; i++) {
      values.push({
        x: i + 1,
        y: 1000000 + Math.random() * 1000,
      });
    }
    setPortfolioChartData([
      {
        id: "Portfolio",
        color: "hsl(247, 70%, 50%)",
        data: values,
      },
    ]);
  }, []);

  useEffect(() => {
    async function fetchUserRecords() {
      let recs = await SimulatorApis.getUserRecords({
        payload: { userId: userData.user_id },
        token,
      });
      if (recs.data.success) {
        setRecords(recs.data.data.rows);
      }
    }
    async function fetchUserStocks() {
      let stcks = await SimulatorApis.getUserStocks({
        payload: { userId: userData.user_id },
        token,
      });
      if (stcks.data.success) {
        setPerformanceData(stcks.data.data.rows);
      }
    }
    async function fetchUserTrades() {
      let trds = await SimulatorApis.getUserTrades({
        payload: { userId: userData.user_id },
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

  console.log("userStocks", records, performanceData, tradeData);

  return (
    <div className={styles.portfolio}>
      <div className={styles.main}>
        {tab === TABS[0].value && (
          <div className={styles.content}>
            <div className={styles.left}>
              <p className={styles.caption}>Portfolio</p>
              <PortfolioChart chartData={portfolioChartData} />
            </div>
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
