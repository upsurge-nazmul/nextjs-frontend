import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/portfolio.module.scss";
import Navigation from "../Navigation";
import Holdings from "./Holdings";
import Performance from "./Performance";
import Trades from "./Trades";
import PortfolioChart from "./PortfolioChart";

const TABS = [
  { name: "Charts", value: "charts", icon: "Charts" },
  { name: "Performance", value: "performance", icon: "Performance History" },
  { name: "Trades", value: "trades", icon: "Trades History" },
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
        {tab === TABS[1].value && (
          // 32.77	31.24	25	819.25	 	+38.25		Buy
          <Performance
            performanceData={[
              {
                id: 1,
                symbol: "ACC",
                desc: "Full name of the company",
                current_price: 32.27,
                purchase_price: 31.24,
                qty: 25,
                total_value: 819.25,
                total_gain_: 38.25,
                trade_action: "buy",
              },
              {
                id: 2,
                symbol: "ACC",
                desc: "Full name of the company",
                current_price: 32.27,
                purchase_price: 31.24,
                qty: 25,
                total_value: 819.25,
                total_gain_: 38.25,
                trade_action: "buy",
              },
              {
                id: 3,
                symbol: "ACC",
                desc: "Full name of the company",
                current_price: 32.27,
                purchase_price: 31.24,
                qty: 25,
                total_value: 819.25,
                total_gain_: 38.25,
                trade_action: "buy",
              },
            ]}
          />
        )}
        {tab === TABS[2].value && (
          <Trades
            tradesData={[
              {
                id: 1,
                date: "24/04/2022",
                symbol: "ACC",
                trade_type: "buy",
                qty: 25,
                price: 32.77,
                total_cash_value: 819.29,
              },
              {
                id: 2,
                date: "24/04/2022",
                symbol: "ACC",
                trade_type: "buy",
                qty: 25,
                price: 32.77,
                total_cash_value: 819.29,
              },
              {
                id: 3,
                date: "24/04/2022",
                symbol: "ACC",
                trade_type: "buy",
                qty: 25,
                price: 32.77,
                total_cash_value: 819.29,
              },
            ]}
          />
        )}
      </div>
      <div className={styles.footerArea}>
        <Navigation
          options={TABS}
          action={setTab}
          active={tab}
          shape="square"
        />
      </div>
    </div>
  );
}
