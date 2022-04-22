import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/portfolio.module.scss";
import Navigation from "../Navigation";
import Holdings from "./Holdings";
import Performance from "./Performance";
import Trades from "./Trades";
import PortfolioChart from "./PortfolioChart";

const TABS = [
  { name: "Charts", value: "charts", icon: "" },
  { name: "Performance", value: "performance", icon: "" },
  { name: "Trades", value: "trades", icon: "" },
];

export default function Portfolio({ userData }) {
  const [tab, setTab] = useState(TABS[0].value);
  const [portfolioChartData, setPortfolioChartData] = useState();

  useEffect(() => {
    let values = [];
    for (let i = 0; i < 100; i++) {
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

  return (
    <div className={styles.portfolio}>
      <div className={styles.main}>
        {tab === TABS[0].value && (
          <div className={styles.content}>
            <div className={styles.left}>
              <p className={styles.caption}>Portfolio</p>
              <PortfolioChart chartData={portfolioChartData} />
            </div>
            <div className={styles.right}>
              <p className={styles.caption}>Holdings</p>
              <Holdings userData={userData} />
            </div>
          </div>
        )}
        {tab === TABS[1].value && <Performance />}
        {tab === TABS[2].value && <Trades />}
      </div>
      <div className={styles.footerArea}>
        <Navigation options={TABS} action={setTab} active={tab} />
      </div>
    </div>
  );
}
