import React from "react";
import styles from "../../styles/WaitlistDashboard/todolist.module.scss";
export default function TodoList({ data, hide, completed, total }) {
  return (
    <div className={styles.todolist}>
      <div className={styles.background} onClick={hide}></div>
      <div className={styles.main}>
        <div
          className={`${styles.todo} ${data.completed_kq && styles.completed}`}
        >
          <p>Complete knowledgequest</p>
        </div>
        <div
          className={`${styles.todo} ${
            data.completed_quiz && styles.completed
          }`}
        >
          <p>Complete money quotient</p>
        </div>
        <div
          className={`${styles.todo} ${
            data.completed_ludo && styles.completed
          }`}
        >
          <p>Play ludo</p>
        </div>
        <div
          className={`${styles.todo} ${
            data.completed_daily_quiz && styles.completed
          }`}
        >
          <p>Solve daily quiz</p>
        </div>
        <div
          className={`${styles.todo} ${
            data.invited_friends && styles.completed
          }`}
        >
          <p>Send invite to your closest friend</p>
        </div>
        <div
          className={`${styles.todo} ${
            data.invited_more_friends && styles.completed
          }`}
        >
          <p>Send invite to your 5 friends</p>
        </div>
        <div
          className={`${styles.todo} ${
            data.changed_avatar && styles.completed
          }`}
        >
          <p>Change your avatar</p>
        </div>
      </div>
    </div>
  );
}
