import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import {
  completedtimeDifference,
  duetimeDifference,
} from "../../helpers/timehelpers";
import styles from "../../styles/Dashboard/chorecomponent.module.scss";
import Confirmation from "../Confirmation";
import ClockSvg from "../SVGcomponents/ClockSvg";
import CompletedSvg from "../SVGcomponents/CompletedSvg";
import MenuSvg from "../SVGcomponents/MenuSvg";
import PendingSvg from "../SVGcomponents/PendingSvg";
import ChoreComponentMenu from "./ChoreComponentMenu";

function ChoreComponent({ data, settoastdata, setchores }) {
  const [showmenu, setshowmenu] = useState(false);
  const [showConfirmation, setshowConfirmation] = useState(false);
  const [notificationtype, setnotificationtype] = useState(
    data.completion === "pending"
      ? "Nudge"
      : data.completion === "started"
      ? "Cheer"
      : "Applaud"
  );
  const router = useRouter();

  useEffect(() => {
    if (showmenu) document.addEventListener("mousedown", getifclickedoutside);
    else document.removeEventListener("mousedown", getifclickedoutside);
    function getifclickedoutside(e) {
      let menu = document.getElementById(`menu-${data.id}`);
      if (menu !== null && !menu.contains(e.target)) {
        setshowmenu(false);
      }
    }
    return () => {
      document.removeEventListener("mousedown", getifclickedoutside);
    };
  }, [showmenu]);
  async function deletechore() {
    let res = await DashboardApis.deletechore({ id: data.id });
    if (res && res.data && res.data.success) {
      setchores((prev) => prev.filter((item) => item.id !== data.id));
      settoastdata({
        type: "success",
        msg: "Deleted successfully",
        show: true,
      });
    } else {
      settoastdata({
        type: "error",
        msg: "Error Deleting",
        show: true,
      });
    }
    setshowConfirmation(false);
  }
  async function sendNotification() {
    let res = await DashboardApis.addnotification({ type: notificationtype });
    if (res && res.data && res.data.success) {
      settoastdata({
        show: true,
        type: "success",
        msg: res.data.message,
      });
    } else {
      settoastdata({
        show: true,
        type: "success",
        msg: res.data.message || "Error connecting to server",
      });
    }
  }
  return (
    <div className={styles.choreComponent}>
      {showConfirmation && (
        <Confirmation
          settoastdata={settoastdata}
          onConfirm={deletechore}
          onCancel={() => setshowConfirmation(false)}
          heading={"All data related to selected chore will be deleted."}
        />
      )}
      <img
        src={
          data.category === "Bathroom"
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
          {data?.completion === "completed"
            ? completedtimeDifference(data.completed_at || data.due_date)
            : duetimeDifference(data?.due_date)}
        </p>
      </div>
      <div className={styles.completionIcon}>
        {data.completion === "completed" || data.completion === "approval" ? (
          <CompletedSvg />
        ) : (
          <PendingSvg />
        )}
      </div>
      <div className={styles.button} onClick={sendNotification}>
        {notificationtype}
      </div>

      <div
        className={styles.more}
        id={data.id + "menu-button"}
        onClick={() => setshowmenu(!showmenu)}
      >
        {showmenu && (
          <ChoreComponentMenu
            setshowConfirmation={setshowConfirmation}
            data={data}
            setshowmenu={setshowmenu}
          />
        )}
        <MenuSvg className={styles.menuicon} />
      </div>
    </div>
  );
}

export default ChoreComponent;
