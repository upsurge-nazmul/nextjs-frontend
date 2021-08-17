import React, { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import LiveClassComponent from "../../components/LiveClasses/LiveClassComponent";
import styles from "../../styles/LiveClasses/liveclasses.module.scss";
function LiveClassesPage() {
  const [selection, setselection] = useState("available");
  return (
    <div className={styles.liveclasses}>
      <DashboardLeftPanel />
      <div className={styles.mainContent}>
        <DashboardHeader mode="Live Classes" />
        <div className={styles.switch}>
          <p
            onClick={() => setselection("available")}
            className={`${styles.tabs} ${
              selection === "available" ? styles.selected : ""
            }`}
          >
            Available
          </p>
          <p
            onClick={() => setselection("Enrolled")}
            className={`${styles.tabs} ${
              selection !== "available" ? styles.selected : ""
            }`}
          >
            Enrolled
          </p>
        </div>
        <div className={styles.wrapper}>
          <LiveClassComponent />
          <LiveClassComponent />
          <LiveClassComponent />
          <LiveClassComponent />
          <LiveClassComponent />
        </div>
      </div>
    </div>
  );
}

export default LiveClassesPage;
