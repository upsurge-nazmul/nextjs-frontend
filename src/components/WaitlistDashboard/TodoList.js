import React from "react";
import styles from "../../styles/WaitlistDashboard/todolist.module.scss";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Jasper from "../SVGcomponents/Jasper";
export default function TodoList({ data, hide, completed, total }) {
  return (
    <div className={styles.todolist}>
      <div className={styles.background} onClick={hide}></div>
      <Jasper className={styles.jasper} />
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
            <span className={styles.check}>
              {data.completed_kq && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p>Complete knowledge quest</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.completed_quiz && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check}>
              {data.completed_quiz && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p>Complete money quotient</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.completed_ludo && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check}>
              {data.completed_ludo && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p>Play ludo</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.completed_daily_quiz && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check}>
              {data.completed_daily_quiz && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p>Solve daily quiz</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.invited_friends && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check}>
              {data.invited_friends && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p>Send invite to your closest friend</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.invited_more_friends && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check}>
              {data.invited_more_friends && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p>Send invite to your 5 friends</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.changed_avatar && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check}>
              {data.changed_avatar && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p>Change your avatar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
