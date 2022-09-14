import styles from "../../styles/Journey/taskDisplay.module.scss";

export default function TaskDisplay({ task }) {
  return (
    <div className={styles.view}>
      <iframe id="iframe" className={styles.iframe} src={task.route}></iframe>
    </div>
  );
}
