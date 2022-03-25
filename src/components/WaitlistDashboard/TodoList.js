import React from "react";
import styles from "../../styles/WaitlistDashboard/todolist.module.scss";
export default function TodoList({ data, hide, completed, total }) {
  return (
    <div className={styles.todolist}>
      <div className={styles.background} onClick={hide}></div>
      <div className={styles.main}>
        <div className={styles.head}>
          <p className={styles.heading}>ToDo List</p>
          <p className={styles.subheading}>
            {completed}/{total}
          </p>
        </div>
        <div className={styles.wrapper}>
          <div
            className={`${styles.todo} ${
              data.completed_kq && styles.completed
            }`}
          >
            <input
              type="checkbox"
              className={styles.checkbox}
              checked="checked"
            />
            <span className={styles.check} />
            <p>Complete knowledgequest</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.completed_quiz && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check} />
            <p>Complete money quotient</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.completed_ludo && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check} />
            <p>Play ludo</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.completed_daily_quiz && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check} />
            <p>Solve daily quiz</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.invited_friends && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check} />
            <p>Send invite to your closest friend</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.invited_more_friends && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check} />
            <p>Send invite to your 5 friends</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.changed_avatar && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check} />
            <p>Change your avatar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
