import React from "react";
import ChoreApis from "../../actions/apis/ChoreApis";
import DashboardApis from "../../actions/apis/DashboardApis";
import { duetimeDifference } from "../../helpers/timehelpers";
import styles from "../../styles/Chores/chorepending.module.scss";
import ClockSvg from "../SVGcomponents/ClockSvg";
import RemoveSvg from "../SVGcomponents/RemoveSvg";

function ChorePending({ data, settoastdata, setchores, setallchores }) {
  async function handleApprove() {
    let response = await ChoreApis.approvechore({ id: data.id });
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
          data.img_url || data.category === "Bathroom"
            ? "/images/chores/bathroom.jpg"
            : "/images/chores/kitchen.png"
        }
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>
          {data.title} {data.is_reoccurring && "(Daily)"}
        </div>
        <div className={styles.to}>{data.assigned_to}</div>
      </div>
      <div className={styles.time}>
        <ClockSvg />
        <p>
          {data.is_reoccurring
            ? data.latest_chore.completion === "completed"
              ? completedtimeDifference(data.latest_chore.completed_at)
              : duetimeDifference(data?.latest_chore.due_date)
            : data.completion === "completed"
            ? completedtimeDifference(data.completed_at)
            : duetimeDifference(data?.due_date)}
        </p>
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
