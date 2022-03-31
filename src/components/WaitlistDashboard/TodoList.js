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
          <p className={styles.heading}>Milestones</p>
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
            <p>Go on the upsurge quest</p>
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
            <p>Take the Money Quotient Quiz</p>
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
            <p>Play upsurge ludo</p>
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
            <p>Answer daily challenges</p>
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
            <p>Invite your closest friends</p>
          </div>
          <div
            className={`${styles.todo} ${
              data.invited_more_friends && styles.completed
            }`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check}>
              {data.play_games && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p>Play Games in then Arena</p>
          </div>
          <div
            className={`${styles.todo} ${data.used_calc && styles.completed}`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check}>
              {data.changed_avatar && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p>Check upsurge calculators</p>
          </div>
        </div>
      </div>
    </div>
  );
}
