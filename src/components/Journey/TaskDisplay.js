import React from "react";
import styles from "../../styles/Journey/taskDisplay.module.scss";
import Modal from "../Modal";
import { PATHWAY_TASK_TYPE } from "../../static_data/Pathways_Data";
import { useRouter } from "next/dist/client/router";
import PathwayQuiz from "./PathwayQuiz";
;
export default function TaskDisplay({ task, handleCancelClick }) {
  const router = useRouter();
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
        <PathwayQuiz data={'2ee7908a-2549-4544-9328-238c6a09a013'} />
      </div>
    </Modal>
  );}
  else { 
    router.push(task.route); 
    return null;
  }
}
