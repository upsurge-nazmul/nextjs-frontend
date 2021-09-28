import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import KidApis from "../../actions/apis/KidApis";
import styles from "../../styles/kidDashboard/kidChore.module.scss";
import ClockSvg from "../SVGcomponents/ClockSvg";
import MenuSvg from "../SVGcomponents/MenuSvg";
import PendingSvg from "../SVGcomponents/PendingSvg";
import RoundedTick from "../SVGcomponents/RoundedTick";

function KidChore({ data, settoastdata }) {
  const [showmenu, setshowmenu] = useState(false);
  const [choredata, setchoredata] = useState(data);
  const router = useRouter();
  function timeDifference() {
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
      let menu = document.querySelector(".menu");
      if (menu !== null && !menu.contains(e.target)) {
        setshowmenu(false);
      }
    }
    return () => {
      document.removeEventListener("mousedown", getifclickedoutside);
    };
  }, [showmenu]);
  async function handleMarkStart() {
    if (choredata.completion === "started") {
      return;
    }
    let response = await KidApis.markchorestarted({ choreId: choredata.id });
    if (response && response.data && response.data.success) {
      settoastdata({ show: true, type: "success", msg: "done" });
      setchoredata((prev) => ({ ...prev, completion: "started" }));
    } else {
      console.log(response);
      settoastdata({
        show: true,
        type: "error",
        msg: response?.data.message || "cannot reach server",
      });
    }
  }
  async function handleMarkForApproval() {
    if (choredata.completion === "approval") {
      return;
    }
    let response = await KidApis.markchoreforapproval({
      choreId: choredata.id,
    });
    if (response && response.data && response.data.success) {
      settoastdata({ show: true, type: "success", msg: "done" });
      setchoredata((prev) => ({ ...prev, completion: "approval" }));
    } else {
      console.log(response);
      settoastdata({
        show: true,
        type: "error",
        msg: response?.data.message || "cannot reach server",
      });
    }
  }

  return (
    <div className={styles.kidChore}>
      <img
        src={
          choredata.category === "Bathroom"
            ? "/images/chores/bathroom.jpg"
            : "/images/chores/kitchen.png"
        }
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>{choredata.title}</div>
        <div className={styles.to}>{choredata.assigned_to}</div>
      </div>
      <div className={styles.time}>
        <ClockSvg />

        <p>{timeDifference()}</p>
      </div>
      {choredata.completion === "approval" ? (
        <div
          className={styles.approval}
          onClick={() =>
            settoastdata({
              show: true,
              type: "success",
              msg: "Waiting for approval !",
            })
          }
        >
          <PendingSvg />
          Approval
        </div>
      ) : choredata.completion === "pending" ? (
        <div className={styles.button} onClick={handleMarkStart}>
          Start
        </div>
      ) : (
        <div className={styles.button} onClick={handleMarkForApproval}>
          <RoundedTick />
          Mark as done
        </div>
      )}

      <div className={styles.more}>
        {showmenu ? (
          <div className={styles.menu}>
            <p
              className={styles.menutab}
              onClick={() =>
                router.push("managechore/edit", {
                  choredata: choredata,
                  isineditmode: true,
                })
              }
            >
              Edit
            </p>
          </div>
        ) : null}
        <MenuSvg />
      </div>
    </div>
  );
}

export default KidChore;
