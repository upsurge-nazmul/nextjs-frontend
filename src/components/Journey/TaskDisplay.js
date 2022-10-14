import React from "react";
import styles from "../../styles/Journey/taskDisplay.module.scss";
import Modal from "../Modal";
import QuizView from "../../../../components/ChildQuest/QuizView";
import { PATHWAY_TASK_TYPE } from "../../static_data/Pathways_Data";
import { useRouter } from "next/dist/client/router";
import PathwayQuiz from "./PathwayQuiz";
import DashboardApis from "../../actions/apis/DashboardApis";
import { getCookie } from "../../actions/cookieUtils";

async function addcoins(rewardamount) {
  let res = await DashboardApis.rewardunicoinstochild(
    {
      coincount: rewardamount,
    },
    getCookie("accesstoken")
  );
  if (res && res.data && res.data.success) {
    console.log(res);
  } else {
    console.log(res);
  }
}

export default function TaskDisplay({ task, handleCancelClick }) {
  const router = useRouter();
  addcoins(task.taskReward);
  if(task.type === PATHWAY_TASK_TYPE[0]) {
  return (
    <Modal
      title={task.taskTitle}
      actions={{
        cancelText: "Cancel",
        isCancel: true,
        handleCancel: () => handleCancelClick(),
        proceedText: "Done",
        isProceed: true,
        handleProceed: () => handleCancelClick(),
        proceedButtonType: "normal",
      }}
    >
      <div className={styles.taskDisplay}>
        
          <iframe
            id="iframe"
            className={styles.iframe}
            src={task.route}
          ></iframe>
        
      </div>
    </Modal>
  );}
  else if(task.type === PATHWAY_TASK_TYPE[3]) {
    return (
    <Modal
      title={task.taskTitle}
      actions={{
        cancelText: "Cancel",
        isCancel: true,
        handleCancel: () => handleCancelClick(),
        proceedText: "Done",
        isProceed: true,
        handleProceed: () => handleCancelClick(),
        proceedButtonType: "normal",
      }}
    >
        <div className={styles.taskDisplay}>
          <br />
          <QuizView
            {...{
              chapterId: 4,
              questId: 1,
              handleDone,
              setuserdata,
            }}
          />
        </div>
    </Modal>
  );}
  else { 
    router.push(task.route); 
    return null;
  }
}
