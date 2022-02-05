import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../../../actions/apis/DashboardApis";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../../components/Toast";
import Assignees from "../../../../components/ManageChore/Assignees";
import { useRouter } from "next/dist/client/router";
import styles from "../../../../styles/ManageChore/managechore.module.scss";
import CustomDatePicker from "../../../../components/CustomDatePicker";
import MicSvg from "../../../../components/SVGcomponents/MicSvg";
import AddAssigneeModal from "../../../../components/Chores/AddAssigneeModal";
import DropDown from "../../../../components/DropDown";
import { MainContext } from "../../../../context/Main";
import ChoreApis from "../../../../actions/apis/ChoreApis";
import { choretemplates } from "../../../../helpers/choretemplates";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
import LoginApis from "../../../../actions/apis/LoginApis";
export default function ManageChore({
  choredata,
  childdata,
  userdatafromserver,
}) {
  const router = useRouter();
  const { type, template, templatecat } = router.query;
  const templatename = template?.replace(/-/g, " ");
  const [currentcatarray, setcurrentcatarray] = useState(
    choretemplates[
      choretemplates.findIndex((item) => item.name === templatecat)
    ]?.templates
  );

  const [currentchoretemplate, setcurrentchoretemplate] = useState(
    template
      ? currentcatarray[
          currentcatarray?.findIndex((item) => item.name === templatename)
        ]
      : null
  );
  const [isInEditMode, setIsInEditMode] = useState(
    type !== "new" ? true : false
  );
  const [mode, setmode] = useState(
    (type !== "new" ? "Edit" : "New") + " Chore"
  );
  const [assignees, setassignees] = useState(childdata ? [childdata] : []);
  const [cat, setcat] = useState(
    !isInEditMode ? templatecat : choredata?.category || "HouseHold"
  );
  const [interval, setinterval] = useState("One Time");
  const [showaddmodal, setshowaddmodal] = useState(false);
  const [msg, setmsg] = useState(choredata?.message || "");
  const [lettercounts, setlettercounts] = useState(200);
  const [choretitle, setchoretitle] = useState(
    !isInEditMode ? currentchoretemplate?.name : choredata?.title || ""
  );
  const [duedate, setduedate] = useState(
    choredata
      ? new Date(Number(choredata.due_date))
      : new Date(new Date().setHours(new Date().getHours() + 1))
  );
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [showrecorder, setshowrecorder] = useState(false);
  const [audioDetails, setaudioDetails] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: { h: null, m: null, s: null },
  });
  useEffect(() => {
    setlettercounts(200 - msg.length);
  }, [msg]);
  useEffect(() => {
    console.log(duedate);
  }, [duedate]);

  function startRecord() {
    setrecordState(RecordState.START);
  }
  function resetRecord() {
    setaudioDetails({
      url: null,
      blob: null,
      chunks: null,
      duration: { h: null, m: null, s: null },
    });
  }
  function stopRecord(data) {
    setaudioDetails(data);
  }
  function handleAudioUpload(file) {
    console.log(file);
    console.log(audioDetails);
  }
  function onStop(audioData) {
    console.log("audioData", audioData);
  }
  async function handleSave() {
    if (isInEditMode) {
      let response = await ChoreApis.editchore({
        id: choredata?.data.id,
        message: msg,
        title: choretitle,
        category: choredata?.data.category,
        assigned_to: "tushar",
        child_id: "test1234",
        due_date: new Date(duedate).getTime(),
        completion: "pending",
        is_reoccurring: interval !== "One Time" ? true : false,
      });
      if (response && response.data && response.data.success) {
        settoastdata({
          show: true,
          message: response.data.message,
          type: "success",
        });
        router.push("/dashboard/p/chores");
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
      if (
        !userdatafromserver.plan_name ||
        userdatafromserver.plan_name === "Free"
      ) {
        settoastdata({
          show: true,
          msg: "Please buy a subscription first",
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
          category: cat,
          assigned_to: assignee.first_name,
          child_id: assignee.id,
          family_id: assignee.family_id,
          due_date: tt,
          img_url: currentchoretemplate?.img,
          is_reoccurring: interval !== "One Time" ? true : false,
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
        router.push("/dashboard/p/chores");
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
          gobackto={"/dashboard/p/chores"}
        />
        <div className={styles.mainContent}>
          <div className={styles.imagesection}>
            <img
              src={
                !isInEditMode
                  ? currentchoretemplate?.img
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

            <DropDown
              placeholder="One Time"
              options={["One Time", "Daily"]}
              margin="0 0 20px 0"
              value={interval}
              setvalue={setinterval}
            />
            <CustomDatePicker
              value={duedate}
              setvalue={setduedate}
              onlydate={interval !== "One Time"}
            />
            <DropDown
              placeholder="Household"
              options={[
                "Household",
                "Hobbies",
                "School Work",
                "Fitness",
                "Upsurge Money Matters",
                "Personal",
              ]}
              value={cat}
              setvalue={setcat}
            />
            <div className={styles.msgsection}>
              <textarea
                maxLength="200"
                value={msg}
                onChange={(e) => setmsg(e.target.value)}
                placeholder="message goes here...."
              ></textarea>
              <p className={styles.lettersleft}>
                {lettercounts + " characters left"}
              </p>
            </div>
            {showrecorder ? (
              <Recorder
                record={true}
                title={"Record Audio Message"}
                audioURL={audioDetails.url}
                showUIAudio
                hideHeader
                handleAudioStop={(data) => stopRecord(data)}
                // handleOnChange={(value) =>
                //   this.handleOnChange(value, "firstname")
                // }
                handleAudioUpload={(data) => handleAudioUpload(data)}
                handleReset={() => resetRecord()}
              />
            ) : (
              <div
                className={styles.voice}
                onClick={() => setshowrecorder(true)}
              >
                <div className={styles.icon}>
                  <MicSvg />
                </div>{" "}
              </div>
            )}

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
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: { isLogged: false, msg: msg || "Error" },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      if (params.type !== "new") {
        let choredata = await getChoreData({ id: params.type }, token);
        if (choredata) {
          let childdata = await getChildData({ id: choredata.child_id }, token);
          if (childdata) {
            return {
              props: {
                choredata,
                childdata,
                userdatafromserver: response.data.data,
              },
            };
          } else {
            return {
              props: {
                choredata: choredata,
                childdata: null,
                userdatafromserver: response.data.data,
              },
            };
          }
        } else {
          return { props: { choredata: null, childdata: null } };
        }
      } else {
        return {
          props: {
            choredata: null,
            childdata: null,
            userdatafromserver: response.data.data,
          },
        };
      }
    }
  } else
    return {
      props: { isLogged: false, msg: "cannot get token", choresdata: [] },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
}
async function getChildData(id, token) {
  let response = await DashboardApis.getChildDetails(id, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}

async function getChoreData(id, token) {
  let response = await ChoreApis.getchorebyid(id, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
