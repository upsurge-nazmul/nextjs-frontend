import React from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import styles from "../../styles/Chores/chorepending.module.scss";
import ClockSvg from "../SVGcomponents/ClockSvg";
import CompletedSvg from "../SVGcomponents/CompletedSvg";
import PendingSvg from "../SVGcomponents/PendingSvg";
import RemoveSvg from "../SVGcomponents/RemoveSvg";

function ChorePending({ data, settoastdata, setchores, setallchores }) {
  function timeDifference() {
    let current = new Date().getTime();
    let previous = new Date(Number(data.due_date)).getTime();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
      return "Completed " + Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return "Completed " + Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return "Completed " + Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return "Completed " + Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return "Completed " + Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return "Completed " + Math.round(elapsed / msPerYear) + " years ago";
    }
  }

  async function handleApprove() {
    let response = await DashboardApis.approvechore({ id: data.id });
    if (response && response.data && response.data.success) {
      settoastdata({ show: true, type: "success", msg: "done" });
      setchores((prev) => prev.filter((item) => item.id !== data.id));
      setallchores((prev) => prev.filter((item) => item.id !== data.id));
    } else {
      console.log(response);
      settoastdata({
        show: true,
        type: "success",
        msg: response.data.message || "Cannot reach server",
      });
    }
  }
  return (
    <div className={styles.chorePending}>
      <img
        src={
          data.category === "Bathroom"
            ? "/images/chores/bathroom.jpg"
            : "/images/chores/kitchen.png"
        }
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>{data.title}</div>
        <div className={styles.to}>{data.assigned_to}</div>
      </div>
      <div className={styles.time}>
        <ClockSvg />
        <p>{timeDifference()}</p>
      </div>
      <div className={styles.completionIcon}>
        {data.completion === "approval" ? (
          <CompletedSvg className={styles.compIcon} />
        ) : data.completion === "pending" ? (
          <PendingSvg className={styles.compIcon} />
        ) : null}
      </div>
      <div className={styles.button} onClick={handleApprove}>
        Approve
      </div>
      <div className={styles.removebutton}>
        <RemoveSvg />
      </div>
    </div>
  );
}

export default ChorePending;
