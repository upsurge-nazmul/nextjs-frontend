import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import QuizApis from "../../../actions/apis/QuizApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../components/Toast";
import LeaderboardComponent from "../../../components/WaitlistDashboard/LeaderboardComponent";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/leaderboardspage.module.scss";
export default function Leaderboards({
  userdatafromserver,
  leaderboard,
  highestquizscore,
}) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("Leaderboards");
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  return (
    <div className={styles.leaderboard}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <LeaderboardComponent data={leaderboard} highest={highestquizscore} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return { props: { isLogged: false, msg: msg || "Error" } };
    } else {
      let leaderboard = await QuizApis.leaderboard();
      let highestquizscore = await QuizApis.highestscore({
        email: response.data.data.email,
      });
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          leaderboard: leaderboard.data.data || [],
          highestquizscore: highestquizscore.data.success
            ? highestquizscore.data.data.score
            : 0,

          msg: "",
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
