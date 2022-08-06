import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import ChoreApis from "../../actions/apis/ChoreApis";
import KidApis from "../../actions/apis/KidApis";
import {
  completedtimeDifference,
  duetimeDifference,
} from "../../helpers/timehelpers";
import styles from "../../styles/kidDashboard/kidChore2.module.scss";
import PhotoUpload from "../PhotoUpload";
import ClockSvg from "../SVGcomponents/ClockSvg";
import MenuSvg from "../SVGcomponents/MenuSvg";
import PendingSvg from "../SVGcomponents/PendingSvg";
import RoundedTick from "../SVGcomponents/RoundedTick";

function KidChore({ data, settoastdata }) {
  const [showmenu, setshowmenu] = useState(false);
  const [choredata, setchoredata] = useState(data);
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
  async function handleMarkStart() {
    if (choredata.completion === "started") {
      return;
    }
    let response = await ChoreApis.markchorestarted({
      choreId: choredata.id,
      is_reoccurring: choredata.is_reoccurring,
    });
    if (response && response.data && response.data.success) {
      settoastdata({ show: true, type: "success", msg: "done" });
      if (choredata.is_reoccurring) {
        setchoredata((prev) => ({
          ...prev,
          latest_chore: {
            ...prev.latest_chore,
            completion: "started",
          },
        }));
      } else setchoredata((prev) => ({ ...prev, completion: "started" }));
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
    let response = await ChoreApis.markchoreforapproval({
      choreId: choredata.id,
    });
    if (response && response.data && response.data.success) {
      settoastdata({ show: true, type: "success", msg: "done" });
      if (choredata.is_reoccurring) {
        setchoredata((prev) => ({
          ...prev,
          latest_chore: {
            ...prev.latest_chore,
            completion: "approval",
          },
        }));
      } else setchoredata((prev) => ({ ...prev, completion: "approval" }));
    } else {
      settoastdata({
        show: true,
        type: "error",
        msg: response?.data?.message || "cannot reach server",
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
    if (choredata.completion === "completed")
      return completedtimeDifference(choredata.completed_at);
    else {
      return duetimeDifference(choredata.due_date);
    }
  }

  return (
    <div className={styles.kidChore}>
      <img
        src={
          choredata?.img_url
            ? choredata.img_url
            : choredata.category === "Bathroom"
            ? "/images/chores/bathroom.jpg"
            : "/images/chores/kitchen.png"
        }
        alt=""
      />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>
          {choredata.title} {choredata.is_reoccurring && "(Daily)"}
        </div>
        <div className={styles.to}>Assigned to Me</div>
      </div>
      <div className={styles.midSection}>
        <div className={styles.time}>
          <ClockSvg />
          <p>{duedate}</p>
        </div>
        {data.reward_type ? (
          <div className={styles.reward}>
            <span className={styles.rewardLabel}>Reward:</span>
            <span className={styles.rewardValue}>
              {data.reward_amount} {data.reward_type}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      {choredata.is_reoccurring &&
      JSON.stringify(choredata.latest_chore) !== "{}" ? (
        choredata.latest_chore.completion === "completed" ? (
          <div className={styles.completed}>Completed</div>
        ) : duetimeDifference(choredata?.latest_chore.due_date) ===
          "Expired" ? (
          <div
            className={styles.expiry}
            onClick={() =>
              settoastdata({
                show: true,
                type: "success",
                msg: "Oh oh time's up for this chore !",
              })
            }
          >
            Expired
          </div>
        ) : choredata.latest_chore.completion === "approval" ? (
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
        ) : choredata.latest_chore.completion === "pending" ? (
          <div className={styles.button} onClick={handleMarkStart}>
            Start
          </div>
        ) : (
          <div
            className={styles.markdonebutton}
            onClick={handleMarkForApproval}
            // onClick={() => setOpenPhotoUpload(true)}
          >
            <RoundedTick />
            Mark as done
          </div>
        )
      ) : choredata.completion === "completed" ? (
        <div className={styles.completed}>Completed</div>
      ) : duetimeDifference(choredata?.due_date) === "Expired" ? (
        <div
          className={styles.expiry}
          onClick={() =>
            settoastdata({
              show: true,
              type: "success",
              msg: "Oh oh time's up for this chore !",
            })
          }
        >
          Expired
        </div>
      ) : choredata.completion === "approval" ? (
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
        <div
          className={styles.markdonebutton}
          onClick={handleMarkForApproval}
          // onClick={() => setOpenPhotoUpload(true)}
        >
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
