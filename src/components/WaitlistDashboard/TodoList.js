import React, { useContext } from "react";
import styles from "../../styles/WaitlistDashboard/todolist.module.scss";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Jasper from "../SVGcomponents/Jasper";
import { useRouter } from "next/dist/client/router";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import { MainContext } from "../../context/Main";
import { getCookie } from "../../actions/cookieUtils";
export default function TodoList({
  data,
  hide,
  completed,
  total,
  clickDisabled,
}) {
  const router = useRouter();
  const { userdata } = useContext(MainContext);
  async function hanldeludo() {
    let res = await FreeGameApis.presign({
      user_name:
        userdata.user_name || userdata.first_name || userdata.last_name,
      email: userdata.email,
      phone: userdata.phone,
      token: getCookie("accesstoken"),
      game: "Ludo",
      postlogin: true,
    });
    if (res) {
      if (res.data.success) {
        router.push({
          pathname: "/dashboard/k/game/Ludo",
          query: { id: res.data.data },
        });
      } else {
        console.log(res.data.message);
      }
    } else {
      console.log("error connecting server");
    }
  }
  return (
    <div className={styles.todolist}>
      {router.query.storyIndex !== 2 && (
        <div className={styles.background} onClick={hide}></div>
      )}
      <Jasper className={styles.jasper} />
      <div className={styles.main} id="milestone-wrapper">
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
            <p onClick={() => router.push("/dashboard/k/quest")}>
              Go on the upsurge quest
            </p>
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
            <p onClick={() => router.push("/dashboard/k/quiz")}>
              Take the Money Quotient Quiz
            </p>
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
            <p onClick={hanldeludo}>Play upsurge ludo</p>
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
            <p onClick={hide}>Answer daily challenges</p>
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
            <p onClick={hide}>Invite your closest friends</p>
          </div>
          <div
            className={`${styles.todo} ${data.play_games && styles.completed}`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check}>
              {data.play_games && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p onClick={() => router.push("/dashboard/k/games")}>
              Play Games in then Arena
            </p>
          </div>
          <div
            className={`${styles.todo} ${data.used_calc && styles.completed}`}
          >
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.check}>
              {data.used_calc && (
                <CheckRoundedIcon className={styles.checkicon} />
              )}
            </span>
            <p onClick={() => router.push("/dashboard/k/calculators")}>
              Check upsurge calculators
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
