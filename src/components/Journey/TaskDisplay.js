import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Journey/taskDisplay.module.scss";
import Modal from "../Modal";
import QuizView from "../../components/ChildQuest/QuizView";
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
  const { userData, setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userData);
  }, [userData]);
  const handleDone = () => {
    KnowledgeQuestApi.update({
      level: activeChNo,
      quest_id: currentQuest.questId,
    });
    setUserLevel((prev) => (prev > activeChNo ? prev : activeChNo));
    setView();
    setCurrentChapter();
    setActiveChNo(0);
  };
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
              questId: 4,
              chapterId: 1,
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
