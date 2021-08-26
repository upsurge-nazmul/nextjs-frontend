import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../components/Toast";
import Assignees from "../../components/ManageChore/Assignees";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/ManageChore/managechore.module.scss";
import DropDownArrow from "../../components/SVGcomponents/DropDownArrow";
import MicSvg from "../../components/SVGcomponents/MicSvg";

function ManageChore() {
  const router = useRouter();
  const { type } = router.query;
  const state = router.query.state ? JSON.parse(router.query.state) : null;
  const [mode, setmode] = useState(type + " Chore");
  const [msg, setmsg] = useState(state?.message || state?.data?.message || "");
  const [lettercounts, setlettercounts] = useState(200);
  const [choretitle, setchoretitle] = useState(
    state?.name || state?.title || state?.data.title || ""
  );
  const [duedate, setduedate] = useState(
    state?.due_date
      ? getreadabledate(state?.due_date)
      : "" || state?.data?.due_date
      ? getreadabledate(state?.due_date)
      : "" || "2021-07-21"
  );
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    setlettercounts(200 - msg.length);
  }, [msg]);

  function getreadabledate(date) {
    let fdate = new Date(Number(date));
    let month = fdate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = fdate.getDate();
    day = day < 10 ? "0" + day : day;

    return fdate.getFullYear() + "-" + month + "-" + day;
  }
  async function handleSave() {
    if (state?.isineditmode) {
      let response = await DashboardApis.editchore({
        id: state?.data.id,
        message: msg,
        title: choretitle,
        category: state?.data.category,
        assigned_to: "tushar",
        child_id: "test1234",
        due_date: new Date(duedate).getTime(),
        completion: "pending",
      });
      if (response && response.data && response.data.success) {
        settoastdata({
          show: true,
          message: response.data.message,
          type: "success",
        });
        router.push("/chores");
      } else {
        settoastdata({
          show: true,
          message: response.data.message,
          type: "error",
        });
      }
    } else {
      let response = await DashboardApis.addchore({
        message: msg,
        title: choretitle,
        category: state?.category || state?.category,
        assigned_to: "tushar",
        child_id: "test1234",
        due_date: new Date(duedate).getTime(),
        completion: "pending",
      });
      if (response && response.data && response.data.success) {
        settoastdata({
          show: true,
          message: response.data.message,
          type: "success",
        });
        router.push("/chores");
      } else {
        settoastdata({
          show: true,
          message: response.data.message,
          type: "error",
        });
      }
    }
  }
  return (
    <div className={styles.manageChore}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          showback={true}
          gobackto={"chores"}
        />
        <div className={styles.mainContent}>
          <div className={styles.imagesection}>
            <img
              src={
                state?.image ||
                "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g"
              }
              alt=""
            />
          </div>
          <div className={styles.details}>
            <input
              type="text"
              value={choretitle}
              onChange={(e) => setchoretitle(e.target.value)}
            />
            <input
              type="date"
              value={duedate}
              onChange={(e) => {
                setduedate(e.target.value);
              }}
            />
            <div className={styles.select}>
              {state?.category || state?.data.category || " "}
              <DropDownArrow />
            </div>
            <div className={styles.msgsection}>
              <textarea
                maxLength="200"
                value={msg}
                onChange={(e) => setmsg(e.target.value)}
              ></textarea>
              <p className={styles.lettersleft}>
                {lettercounts + " characters left"}
              </p>
            </div>

            <div className={styles.voice}>
              Add voice note{" "}
              <div className={styles.icon}>
                <MicSvg />
              </div>{" "}
            </div>
            <div className={styles.button} onClick={handleSave}>
              Save Changes
            </div>
            <div className={`${styles.button} ${styles.delete}`}>
              Delete Chore
            </div>
            <div className={`${styles.button} ${styles.template}`}>
              +Save as template
            </div>
          </div>
          <div className={styles.assignto}>
            <p className={styles.heading}>Asssigned To</p>
            <div className={styles.wrapper}>
              <Assignees />
            </div>
            <div className={styles.button}>+Add Assignees</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageChore;
