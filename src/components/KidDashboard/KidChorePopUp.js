import React,{useEffect,useState} from 'react'
import { useRouter } from "next/dist/client/router";
import PendingSvg from "../SVGcomponents/PendingSvg";
import RoundedTick from "../SVGcomponents/RoundedTick";
import ChoreApis from "../../actions/apis/ChoreApis";
import styles from "../../styles/kidDashboard/Kidchorepopup.module.scss";
import KidApis from "../../actions/apis/KidApis";
import {
    completedtimeDifference,
    duetimeDifference,
  } from "../../helpers/timehelpers";

function KidChorePopUp({choredata,showPopUp,setShowPopUp,settoastdata,setchoredata}) {
    const [showmenu, setshowmenu] = useState(false);
    const [choredatas, setchoredatas] = useState(choredata);
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
      console.log(choredata);
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
    <div className={styles.chorePopUp}>
    <div className={styles.chorePopUpWrapper}>
            <div
                className={styles.background}
                onClick={() => setShowPopUp(!showPopUp)}
              ></div>
              <div className={styles.chorePopUpcontainer}>
              <div className={styles.firstSection}>
              <div className={styles.reward}>
              <span className={styles.rewardLabel}>UniCoins to Earn: </span>
              <span className={styles.rewardValue}> 
             { choredata.custom_rewards === "" && (
                <>
                 {choredata.reward_amount}
                </>
                )
              } 
            {choredata.custom_rewards}
              </span>
              </div>
              </div>
              <div className={styles.secondSection}>
              <div className={styles.title}>
          <h3>Chore: </h3>  {choredata.title} {choredata.is_reoccurring && "(Daily)"}
          </div>
          <div className={styles.message}>
          <h4 style={{marginBottom:"0.5rem"}}>Message</h4>
          {choredata.message}
              </div>
          <div className={styles.deadline}>
            <h4>
                Deadline: 
                </h4>
            {duedate}
          </div>
          </div>
              <div className={styles.thirdSection}>
                <div className={styles.left}>
                    Sound: Click to listen to the message
                </div>
                <div className={styles.right}>
        {choredata.is_reoccurring &&
          JSON.stringify(choredata.latest_chore) !== "{}" ? (
              choredata.latest_chore.completion === "completion" ? (
                  <button className={styles.completedButton}>Completed</button>
                  ) : duetimeDifference(choredata?.latest_chore.due_date) ===
                  "Expired" ? (
                      <button
                      className={styles.expiredButton}
                      onClick={() =>
                        settoastdata({
                            show: true,
                            type: "success",
                            msg: "Oh oh time's up for this chore !",
                        })
                    }
                    >
                Expired
              </button>
            ) : choredata.latest_chore.completion === "approval" ? (
                <button
                className={styles.approvalButton}
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
              </button>
            ) : choredata.latest_chore.completion === "pending" ? (
                <button className={styles.startButton} onClick={handleMarkStart}>
                Start
              </button>
            ) : (
                <button
                className={styles.markDoneButton}
                onClick={handleMarkForApproval}
                // onClick={() => setOpenPhotoUpload(true)}
                >
                <RoundedTick />
                Mark as done
              </button>
            )
            ) : choredata.completion === "completed" ? (
                <button className={styles.completedButton}>Completed</button>
                ) : duetimeDifference(choredata?.due_date) === "Expired" ? (
                    <button
                    className={styles.expiredButton}
                    onClick={() =>
                        settoastdata({
                            show: true,
                            type: "success",
                            msg: "Oh oh time's up for this chore !",
                        })
                    }
                    >
              Expired
            </button>
          ) : choredata.completion === "approval" ? (
              <button
              className={styles.approvalButton}
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
            </button>
          ) : choredata.completion === "pending" ? (
              <button className={styles.startButton} onClick={handleMarkStart}>
              Start
            </button>
          ) : (
              <button
              className={styles.markDoneButton}
              onClick={handleMarkForApproval}
              // onClick={() => setOpenPhotoUpload(true)}
              >
              <RoundedTick />
              Mark as done
            </button>
          )}
          </div>
          </div>
          </div>
          </div>
    </div>
  )
}

export default KidChorePopUp