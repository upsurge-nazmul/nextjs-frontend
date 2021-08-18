import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../components/Toast";
import Assignees from "../../components/ManageChore/Assignees";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/ManageChore/managechore.module.scss";

function ManageChore() {
  const router = useRouter();
  const { type } = router.query;
  const state = JSON.parse(router.query.state);
  console.log(state);
  const [mode, setmode] = useState(type + " Chore");
  const [msg, setmsg] = useState(state?.message || state?.data?.message || "");
  const [lettercounts, setlettercounts] = useState(200);
  const [choretitle, setchoretitle] = useState(
    state?.name || state?.title || state.data.title || ""
  );
  const [duedate, setduedate] = useState(
    state?.due_date
      ? getreadabledate(state.due_date)
      : "" || state?.data?.due_date
      ? getreadabledate(state.due_date)
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
    if (state.isineditmode) {
      let response = await DashboardApis.editchore({
        id: state.data.id,
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
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3962 0H0.603751C0.100078 0 -0.18116 0.639064 0.130759 1.07535L8.52701 12.7751C8.76734 13.11 9.2301 13.11 9.47299 12.7751L17.8692 1.07535C18.1812 0.639064 17.8999 0 17.3962 0Z"
                  fill="#787878"
                />
              </svg>
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 4.5C7.5 3.30653 7.97411 2.16193 8.81802 1.31802C9.66193 0.474106 10.8065 0 12 0C13.1935 0 14.3381 0.474106 15.182 1.31802C16.0259 2.16193 16.5 3.30653 16.5 4.5V12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5C10.8065 16.5 9.66193 16.0259 8.81802 15.182C7.97411 14.3381 7.5 13.1935 7.5 12V4.5Z"
                    fill="white"
                  />
                  <path
                    d="M5.25 9.75C5.44891 9.75 5.63968 9.82902 5.78033 9.96967C5.92098 10.1103 6 10.3011 6 10.5V12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12V10.5C18 10.3011 18.079 10.1103 18.2197 9.96967C18.3603 9.82902 18.5511 9.75 18.75 9.75C18.9489 9.75 19.1397 9.82902 19.2803 9.96967C19.421 10.1103 19.5 10.3011 19.5 10.5V12C19.5 13.8593 18.8094 15.6523 17.5622 17.0312C16.3149 18.4101 14.6 19.2766 12.75 19.4625V22.5H17.25C17.4489 22.5 17.6397 22.579 17.7803 22.7197C17.921 22.8603 18 23.0511 18 23.25C18 23.4489 17.921 23.6397 17.7803 23.7803C17.6397 23.921 17.4489 24 17.25 24H6.75C6.55109 24 6.36032 23.921 6.21967 23.7803C6.07902 23.6397 6 23.4489 6 23.25C6 23.0511 6.07902 22.8603 6.21967 22.7197C6.36032 22.579 6.55109 22.5 6.75 22.5H11.25V19.4625C9.40003 19.2766 7.68506 18.4101 6.43782 17.0312C5.19058 15.6523 4.49998 13.8593 4.5 12V10.5C4.5 10.3011 4.57902 10.1103 4.71967 9.96967C4.86032 9.82902 5.05109 9.75 5.25 9.75Z"
                    fill="white"
                  />
                </svg>
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
