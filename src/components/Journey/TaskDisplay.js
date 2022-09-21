import styles from "../../styles/Journey/taskDisplay.module.scss";
import Modal from "../Modal";
import { PATHWAY_TASK_TYPE } from "../../static_data/Pathways_Data";
import { useRouter } from "next/dist/client/router";


export default function TaskDisplay({ task, handleCancelClick }) {
  const router = useRouter();
  useEffect(() => {
    setcurrenttab(router.pathname);
  }, [router]);
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
        {task.type === PATHWAY_TASK_TYPE[0] ? (
          <iframe
            id="iframe"
            className={styles.iframe}
            src={task.route}
          ></iframe>
        ) : (
          router.push(task.route)
        )}
      </div>
    </Modal>
  );
}
