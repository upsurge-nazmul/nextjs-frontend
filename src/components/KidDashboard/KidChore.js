import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import ChoreApis from "../../actions/apis/ChoreApis";
import KidApis from "../../actions/apis/KidApis";
import {
  completedtimeDifference,
  duetimeDifference,
} from "../../helpers/timehelpers";
import styles from "../../styles/kidDashboard/kidChore.module.scss";
import PhotoUpload from "../PhotoUpload";
import ClockSvg from "../SVGcomponents/ClockSvg";
import MenuSvg from "../SVGcomponents/MenuSvg";
import PendingSvg from "../SVGcomponents/PendingSvg";
import RoundedTick from "../SVGcomponents/RoundedTick";
import KidChorePopUp from "./KidChorePopUp";

function KidChore({ data, settoastdata }) {
  const [showmenu, setshowmenu] = useState(false);
  const [choredata, setchoredata] = useState(data);
  const [showPopUp, setShowPopUp] = useState(false);
  const router = useRouter();
  const [duedate, setduedate] = useState(getDueDate());
  const [openPhotoUpload, setOpenPhotoUpload] = useState(false);
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
    if (choredata.completion === "completed")
      return completedtimeDifference(choredata.completed_at);
    else {
      return duetimeDifference(choredata.due_date);
    }
  }

  return (
    <div className={styles.kidChore}>
      <div className={styles.mainCard}>
        <div className={styles.firstSection}>
          <img
            src={
              choredata?.img_url
              ? choredata.img_url
                : choredata.category === "Bathroom"
                ? "/images/chores/bathroom.jpg"
                : "/images/chores/kitchen.png"
              }
            alt="ChoreImage"
            className={styles.banner}
          />
        </div>
        <div className={styles.secondSection}>
          <div className={styles.title}>
            {choredata.title} {choredata.is_reoccurring && "(Daily)"}
          </div>
          {data.reward_type ? (
            <div className={styles.reward}>
              <span className={styles.rewardLabel}>Reward:</span>
              <span className={styles.rewardValue}>
                 {data.reward_amount}
                 {" "}
                 {data.reward_type}
                
              </span>
            </div>
          ) : (
            ""
          )}
          <div className={styles.dueDate}>
            <div className={styles.dueIcon}>
              <ClockSvg />
            </div>
            <p className={styles.dueText}>{duedate}</p>
          </div>
        </div>
        {showPopUp &&
          <KidChorePopUp choredata={choredata} settoastdata={settoastdata} setchoredata={setchoredata} showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
        }
        <div className={styles.thirdSection}>
        <button
                className={styles.approvalButton}
                onClick={() => setShowPopUp(!showPopUp)}
              >
View
</button>
          {showmenu ? (
            <div
              className={styles.menu}
              onClick={() =>
                router.push("managechore/edit", {
                  choredata: choredata,
                  isineditmode: true,
                })
              }
            >
              <MenuSvg />
            </div>
          ) : null}
        </div>
      </div>

      <div>
        {choredata.completion &&
          choredata.completion === "started" &&
          openPhotoUpload && (
            <PhotoUpload
              title={"Provide an image of your completed chore"}
              setShowModal={setOpenPhotoUpload}
              actionButtonTitle={"Mark as done"}
              actionHandler={() => {}}
            />
          )}
      </div>
    </div>
  );
}

export default KidChore;