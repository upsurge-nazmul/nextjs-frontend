import React from "react";
import styles from "../../styles/Chores/chorepending.module.scss";
import ClockSvg from "../SVGcomponents/ClockSvg";
import CompletedSvg from "../SVGcomponents/CompletedSvg";
import PendingSvg from "../SVGcomponents/PendingSvg";
import RemoveSvg from "../SVGcomponents/RemoveSvg";

function ChorePending() {
  const demoChore = {
    image:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
    task: "Prepare Monthly Budget",
    to: "Assigned to Pulkit",
    time: "Completed 3 days ago",
    status: "completed",
  };
  return (
    <div className={styles.chorePending}>
      <img src={demoChore.image} alt="" />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>{demoChore.task}</div>
        <div className={styles.to}>{demoChore.to}</div>
      </div>
      <div className={styles.time}>
        <ClockSvg />
        <p>{demoChore.time}</p>
      </div>
      <div className={styles.completionIcon}>
        {demoChore.status === "completed" ? (
          <CompletedSvg className={styles.compIcon} />
        ) : demoChore.status === "pending" ? (
          <PendingSvg className={styles.compIcon} />
        ) : null}
      </div>
      <div className={styles.button}>Approve</div>
      <div className={styles.removebutton}>
        <RemoveSvg />
      </div>
    </div>
  );
}

export default ChorePending;
