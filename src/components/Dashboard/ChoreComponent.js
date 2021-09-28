import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
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
  let currenttime = new Date().getTime();
  let due_date = new Date(Number(data.due_date)).getTime();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((due_date - currenttime) / oneDay));
  due_date = `Due in ${diffDays} days`;
  function completedtimeDifference() {
    let current = new Date().getTime();
    let previous = new Date(
      Number(data.completed_at || data.due_date)
    ).getTime();
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
  function duetimeDifference() {
    let current = new Date().getTime();
    let previous = new Date(Number(choredata?.due_date)).getTime();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
      return "Due " + Math.round(elapsed / 1000) + " in seconds";
    } else if (elapsed < msPerHour) {
      return "Due " + Math.round(elapsed / msPerMinute) + " in minutes";
    } else if (elapsed < msPerDay) {
      return "Due " + Math.round(elapsed / msPerHour) + " in hours";
    } else if (elapsed < msPerMonth) {
      return "Due " + Math.round(elapsed / msPerDay) + " in days";
    } else if (elapsed < msPerYear) {
      return "Due " + Math.round(elapsed / msPerMonth) + " in months";
    } else {
      return "Due " + Math.round(elapsed / msPerYear) + " in years";
    }
  }
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
        <div className={styles.task}>{data.title}</div>
        <div className={styles.to}>{data.assigned_to}</div>
      </div>
      <div className={styles.time}>
        <ClockSvg />

        <p>
          {data?.completion === "completed"
            ? completedtimeDifference()
            : duetimeDifference()}
        </p>
      </div>
      <div className={styles.completionIcon}>
        {data.completion === "completed" || "approval" ? (
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
