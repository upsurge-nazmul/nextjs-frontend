import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import ChoreApis from "../../actions/apis/ChoreApis";
import DashboardApis from "../../actions/apis/DashboardApis";
import NotificationApis from "../../actions/apis/NotificationApis";
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
  console.log(JSON.stringify(data.latest_chore) !== "{}");
  const [showmenu, setshowmenu] = useState(false);
  const [choredata, setchoredata] = useState(data || null);
  const [showConfirmation, setshowConfirmation] = useState(false);
  const [notificationtype, setnotificationtype] = useState(
    data.is_reoccurring && JSON.stringify(data.latest_chore) !== "{}"
      ? data.latest_chore?.completion === "pending"
        ? "Nudge"
        : data.latest_chore?.completion === "started"
        ? "Cheer"
        : "Applaud"
      : data.completion === "pending"
      ? "Nudge"
      : data.completion === "started"
      ? "Cheer"
      : "Applaud"
  );
  const [duedate, setduedate] = useState(getDueDate());
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
  useEffect(() => {
    let x = setInterval(() => {
      if (duedate === "Expired") {
        if (x) {
          clearInterval(x);
        }
        return;
      }
      setduedate(getDueDate());
    }, 1000 * 60);
    return () => clearInterval(x);
  }, []);
  async function deletechore() {
    let res = await ChoreApis.deletechore({ id: data.id });
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
    let res = await NotificationApis.addnotification({
      type: notificationtype,
      receiver_id: data.child_id,
      msg:
        notificationtype === "Nudge"
          ? "Complete chore : " + data.title
          : notificationtype === "Cheer"
          ? "For starting chore : " + data.title
          : "For completing chore : " + data.title,
    });
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
  function getDueDate() {
    if (choredata.is_reoccurring) {
      if (JSON.stringify(choredata.latest_chore) !== "{}") {
        if (choredata.latest_chore.completion === "completed")
          return completedtimeDifference(choredata.latest_chore.completed_at);
        else {
          return duetimeDifference(choredata?.latest_chore?.due_date);
        }
      }
    }
    console.log("reaching");
    if (choredata.completion === "completed")
      return completedtimeDifference(choredata.completed_at);
    else {
      return duetimeDifference(choredata.due_date);
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
          data.is_reoccurring
            ? data.latest_chore
              ? data.latest_chore.img_url
                ? data.latest_chore.img_url
                : data.img_url
              : data.img_url
            : data.img_url
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
        <p>{duedate}</p>
      </div>
      <div className={styles.completionIcon}>
        {data.completion === "completed" || data.completion === "approval" ? (
          <CompletedSvg />
        ) : (
          <PendingSvg />
        )}
      </div>
      {duedate !== "Expired" && (
        <div className={styles.button} onClick={sendNotification}>
          {notificationtype}
        </div>
      )}

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
