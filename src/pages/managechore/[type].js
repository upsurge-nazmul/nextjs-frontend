import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../components/Toast";
import Assignees from "../../components/ManageChore/Assignees";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/ManageChore/managechore.module.scss";
import DropDownArrow from "../../components/SVGcomponents/DropDownArrow";
import MicSvg from "../../components/SVGcomponents/MicSvg";
import AddAssigneeModal from "../../components/Chores/AddAssigneeModal";
import DropDown from "../../components/DropDown";
import { MainContext } from "../../context/Main";
import ChoreApis from "../../actions/apis/ChoreApis";

export default function ManageChore({ choredata, childdata }) {
  const router = useRouter();
  const { currentChoreTemplate } = useContext(MainContext);
  const { type } = router.query;
  const [isInEditMode, setIsInEditMode] = useState(
    type !== "new" ? true : false
  );
  const [mode, setmode] = useState(
    (type !== "new" ? "Edit" : "New") + " Chore"
  );
  const [assignees, setassignees] = useState(childdata ? [childdata] : []);
  const [cat, setcat] = useState(
    !isInEditMode
      ? currentChoreTemplate.category
      : choredata?.category || "kitchen"
  );
  const [showaddmodal, setshowaddmodal] = useState(false);
  const [msg, setmsg] = useState(choredata?.message || "");
  const [lettercounts, setlettercounts] = useState(200);
  const [choretitle, setchoretitle] = useState(
    !isInEditMode ? currentChoreTemplate.name : choredata?.title || ""
  );
  const [duedate, setduedate] = useState(
    choredata?.due_date || new Date().getTime()
  );
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    setlettercounts(200 - msg.length);
  }, [msg]);

  async function handleSave() {
    if (choredata?.isineditmode) {
      let response = await ChoreApis.editchore({
        id: choredata?.data.id,
        message: msg,
        title: choretitle,
        category: choredata?.data.category,
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
      if (assignees.length < 1) {
        settoastdata({
          show: true,
          msg: "Add Assignee",
          type: "error",
        });
        return;
      }
      let noerror = true;
      for (let i = 0; i < assignees.length; i++) {
        const assignee = assignees[i];
        let tt = new Date(duedate).getTime();
        if (tt <= new Date().getTime()) {
          settoastdata({
            show: true,
            msg: "Due date should not be the current date",
            type: "error",
          });
          return;
        }
        let response = await ChoreApis.addchore({
          message: msg,
          title: choretitle,
          category: choredata?.category || "home",
          assigned_to: assignee.first_name,
          child_id: assignee.id,
          due_date: tt,
          completion: "pending",
        });
        if (!response || !response.data || !response.data.success) {
          noerror = false;
          return;
        }
      }
      if (noerror) {
        settoastdata({
          show: true,
          msg: "Chores added successfully",
          type: "success",
        });
        router.push("/chores");
      } else {
        settoastdata({
          show: true,
          msg: "Error saving chores",
          type: "error",
        });
      }
    }
  }
  return (
    <div className={styles.manageChore}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      {showaddmodal && (
        <AddAssigneeModal
          assignees={assignees}
          setassignees={setassignees}
          onConfirm={() => setshowaddmodal(false)}
          settoastdata={settoastdata}
          onCancel={() => setshowaddmodal(false)}
        />
      )}
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
                !isInEditMode
                  ? currentChoreTemplate.image
                  : choredata?.image ||
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
              value={
                duedate
                  ? new Date(parseInt(duedate))?.toISOString().substr(0, 10)
                  : new Date().toISOString().substr(0, 10)
              }
              onChange={(e) => {
                if (new Date(e.target.value).getTime() < new Date().getTime()) {
                  settoastdata({
                    show: true,
                    type: "error",
                    msg: `Invaild due date`,
                  });
                } else {
                  setduedate(new Date(e.target.value).getTime());
                }
              }}
              placeholder="dd-mm-yyyy"
            />
            <DropDown
              placeholder="Gender"
              options={[
                "kitchen",
                "bathroom",
                "garden",
                "homework",
                "grooming",
                "excercise",
              ]}
              value={cat}
              setvalue={setcat}
            />
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
              {type !== "new" ? "Save Changes" : "Save & Assign"}
            </div>
            {type !== "new" && (
              <div className={`${styles.button} ${styles.delete}`}>
                Delete Chore
              </div>
            )}
            <div className={`${styles.button} ${styles.template}`}>
              +Save as template
            </div>
          </div>
          <div className={styles.assignto}>
            <p className={styles.heading}>Asssigned To</p>
            <div className={styles.wrapper}>
              {assignees.map((item) => (
                <Assignees data={item} key={item.id} />
              ))}
            </div>
            {type === "new" && (
              <div
                className={styles.button}
                onClick={() => setshowaddmodal(true)}
              >
                +Add Assignees
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  if (token && params.type !== "add") {
    let choredata = await getChoreData({ id: params.type }, token);
    if (choredata) {
      let childdata = await getChildData({ id: choredata.child_id }, token);
      if (childdata) {
        return { props: { choredata, childdata } };
      } else {
        return { props: { choredata: choredata, childdata: null } };
      }
    } else {
      return { props: { choredata: null, childdata: null } };
    }
  } else return { props: { choredata: null, childdata: null } };
}
async function getChildData(id, token) {
  let response = await ChoreApis.getChildDetails(id, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}

async function getChoreData(id, token) {
  let response = await ChoreApis.getchorebyid(id, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
