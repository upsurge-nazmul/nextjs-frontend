import React, { useState } from "react";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import SimulatorDash from "../../../components/StockSimulator/Dash";
import Watchlist from "../../../components/StockSimulator/Watchlist";
import Toast from "../../../components/Toast";
import styles from "../../../styles/kidDashboard/stocksimulator.module.scss";
import Logo from "../../../components/SVGcomponents/Logo";

export default function StockSimulator() {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  return (
    <div className={styles.stockSimulator}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <div className={styles.topSection}>
          <Logo
            className={styles.stocksimulatorlogo}
            //   onClick={() => {
            //     router.push("/");
            //   }}
          />
          <Watchlist />
        </div>
        <div className={styles.bottomSection}>
          <SimulatorDash />
        </div>
      </div>
    </div>
  );
}
