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
import { uploadaudiotos3 } from "../../../../helpers/aws";
import Tour from "../../../../components/Tour/Tour";

const REWARD_TYPES = [{ name: "UniCoins", value: "unicoins" }];

export default function ManageChore({
  choredata,
  childdata,
  userdatafromserver,
  templatedata,
}) {
  const router = useRouter();
  const { setuserdata } = useContext(MainContext);
  const { type, template, templatecat } = router.query;
  const [storyIndex, setStoryIndex] = useState(0);
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
  const [interval, setinterval] = useState(
    templatedata?.is_reoccurring ? "Daily" : "One Time"
  );
  const [showaddmodal, setshowaddmodal] = useState(false);
  const [msg, setmsg] = useState(choredata?.message || "");
  const [lettercounts, setlettercounts] = useState(200);
  const [choretitle, setchoretitle] = useState(
    !isInEditMode
      ? templatedata
        ? templatedata.name
        : currentchoretemplate?.name
      : choredata?.title || ""
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
  const [audiouploadedurl, setaudiouploadedurl] = useState(
    choredata?.voice_note || ""
  );
  const [rewardType, setRewardType] = useState(REWARD_TYPES[0]);
  const [rewardAmount, setRewardAmount] = useState(200);

  useEffect(() => {
    setlettercounts(200 - msg.length);
  }, [msg]);
  useEffect(() => {
    console.log(duedate);
  }, [duedate]);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);

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
  async function handleAudioUpload(file) {
    if (!file) return;
    let url = await uploadaudiotos3(userdatafromserver.user_id, file);
    setaudiouploadedurl(url);
  }
  function onStop(audioData) {
    console.log("audioData", audioData);
  }
  async function handleSave() {
    if (isInEditMode) {
      let response = await ChoreApis.editchore({
        id: choredata?.id,
        message: msg,
        title: choretitle,
        category: cat,
        assigned_to: choredata?.assigned_to,
        child_id: choredata?.child_id,
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
      // if (
      //   !userdatafromserver.plan_name ||
      //   userdatafromserver.plan_name === "Free"
      // ) {
      //   settoastdata({
      //     show: true,
      //     msg: "Please buy a subscription first",
      //     type: "error",
      //   });
      //   return;
      // }
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
          voice_note: audiouploadedurl,
          due_date: tt,
          img_url: currentchoretemplate?.img,
          is_reoccurring: interval !== "One Time" ? true : false,
          completion: "pending",
          reward_type: rewardType.value,
          reward_amount: rewardAmount,
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
        if (router.query.pushTo) {
          router.push("/dashboard/p/?showTour=true&storyIndex=10");
        } else {
          router.push("/dashboard/p/chores");
        }
      } else {
        settoastdata({
          show: true,
          msg: "Error saving chores",
          type: "error",
        });
      }
    }
  }
  async function handleSaveTemplate() {
    // if (
    //   !userdatafromserver.plan_name ||
    //   userdatafromserver.plan_name === "Free"
    // ) {
    //   settoastdata({
    //     show: true,
    //     msg: "Please buy a subscription first",
    //     type: "error",
    //   });
    //   return;
    // }
    let response = await ChoreApis.addtemplate({
      name: choretitle,
      category: cat,
      img_url: currentchoretemplate?.img,
      is_reoccurring: interval !== "One Time" ? true : false,
    });

    if (response && response.data && response.data.success) {
      settoastdata({
        show: true,
        msg: "Template added successfully",
        type: "success",
      });
    } else {
      settoastdata({
        show: true,
        msg: response.data.message || "Error saving chore template",
        type: "error",
      });
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
          gobackto={"/dashboard/p/chores"}
        />
        <div className={styles.mainContent}>
          <div className={styles.imagesection}>
            <img
              src={
                !isInEditMode
                  ? templatedata
                    ? templatedata.img_url
                    : currentchoretemplate?.img
                  : choredata?.image ||
                    "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g"
              }
              alt=""
            />
          </div>
          <div className={styles.details}>
            <input
              type="text"
              id="chore-title"
              value={choretitle}
              onChange={(e) => setchoretitle(e.target.value)}
            />
            <DropDown
              id="chore-inteval-dropdown"
              placeholder="One Time"
              options={["One Time", "Daily"]}
              margin="0 0 20px 0"
              value={interval}
              setvalue={setinterval}
            />
            <CustomDatePicker
              id="chore-date"
              value={duedate}
              setvalue={setduedate}
              onlydate={interval !== "One Time"}
              mindate={"today"}
            />
            <DropDown
              id="chore-cat"
              placeholder="Category"
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

            <div className={styles.msgsection} id="chore-msg">
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
            {audiouploadedurl && (
              <audio controls className={styles.audioc}>
                <source src={audiouploadedurl} type="audio/ogg"></source>
              </audio>
            )}
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
              !audiouploadedurl && (
                <div
                  className={styles.voice}
                  onClick={() => setshowrecorder(true)}
                >
                  <div className={styles.icon}>
                    <MicSvg />
                  </div>{" "}
                </div>
              )
            )}

            <div className={styles.button} onClick={handleSave} id="save-btn">
              {type !== "new" ? "Save Changes" : "Save & Assign"}
            </div>
            {type !== "new" && (
              <div className={`${styles.button} ${styles.delete}`}>
                Delete Chore
              </div>
            )}
            <div
              className={`${styles.button} ${styles.template}`}
              onClick={handleSaveTemplate}
              id="template-btn"
            >
              +Save as template
            </div>
          </div>
          <div className={styles.assignto}>
            <p className={styles.heading}>Assigned To</p>
            <div className={styles.wrapper}>
              {assignees.map((item) => (
                <Assignees data={item} key={item.id} />
              ))}
            </div>
            {type === "new" && (
              <div
                id="chores-assignee-btn"
                className={styles.button}
                onClick={() => {
                  if (router.query.showTour) {
                    setStoryIndex((prev) => prev + 1);
                  }
                  setshowaddmodal(true);
                }}
              >
                +Add Assignees
              </div>
            )}
            <div className={styles.rewardArea}>
              <div>
                Reward for this task is {rewardAmount} {rewardType.name}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showaddmodal && (
        <AddAssigneeModal
          tourActive={router.query.showTour}
          assignees={assignees}
          setassignees={setassignees}
          onConfirm={() => setshowaddmodal(false)}
          settoastdata={settoastdata}
          onClear={()=>{setshowaddmodal(false)}}
          onCancel={(checkAssignee) => {
            if (checkAssignee) {
              if (assignees.length === 0) {
                settoastdata({
                  show: true,
                  msg: "Add assignees first",
                  type: "error",
                });
                return;
              }
            }
            setStoryIndex((prev) => prev + 1);
            setshowaddmodal(false);
          }}
        />
      )}
      {router.query.showTour && (
        <Tour
          story={[
            {
              ref: "#chores-assignee-btn",
              position: "bottom",
              content: `Click here to add assignees for chore.`,
              superimpose: true,
              required: true,
              highlightBg: true,
              isolate: true,
              disableBtns: true,
            },
            {
              ref: "#assignee-modal",
              position: "bottom",
              delay: true,
              content: `Select children.`,
              disableBtns: true,
              required: true,
              isolate: true,
            },
            {
              ref: "#chore-title",
              position: "bottom",
              content: `Enter chore title here.`,
              required: true,
              isolate: true,
            },
            {
              ref: "#chore-inteval-dropdown",
              position: "bottom",
              content: `Select chore interval.`,
              required: true,
              isolate: true,
            },
            {
              ref: "#chore-date",
              position: "bottom",
              content: `Set date.`,
              required: true,
              isolate: true,
            },
            {
              ref: "#chore-cat",
              position: "bottom",
              content: `Select chore category.`,
              required: true,
              isolate: true,
            },
            {
              ref: "#chore-msg",
              position: "bottom",
              content: `Enter msg here.`,
              required: true,
              isolate: true,
            },
            {
              ref: "#template-btn",
              position: "bottom",
              content: `You can save this chore as an template.`,
              required: true,
              isolate: true,
            },
            {
              ref: "#save-btn",
              position: "bottom",
              content: `Click on save to assign chore.`,
              required: true,
              isolate: true,
            },
          ]}
          current={storyIndex}
          setcurrent={setStoryIndex}
          showtour={true}
        />
      )}
    </div>
  );
}
export async function getServerSideProps(context) {
  let { params, req, query } = context;
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
        if (query.templateid) {
          let res = await ChoreApis.gettemplatedetail(
            { id: query.templateid },
            token
          );
          return {
            props: {
              choredata: null,
              childdata: null,
              userdatafromserver: response.data.data,
              templatedata:
                res && res.data && res.data.success ? res.data.data : null,
            },
          };
        }
        return {
          props: {
            choredata: null,
            childdata: null,
            templatedata: null,
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
