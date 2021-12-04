import React, { useState } from "react";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../components/Toast";
import styles from "../../../styles/WaitlistDashboard/leaderboardspage.module.scss";
export default function Leaderboards() {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("Leaderboards");

  return (
    <div className={styles.leaderboard}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}></div>
      </div>
    </div>
  );
}
