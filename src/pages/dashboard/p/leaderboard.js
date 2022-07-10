import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import DashboardApis from "../../../actions/apis/DashboardApis";
import QuizApis from "../../../actions/apis/QuizApis";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Curve1 from "../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../components/SVGcomponents/Curve2";
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
  const [mode, setmode] = useState("Leaderboard");
  const { setuserdata } = useContext(MainContext);
  const router = useRouter();
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);

  return (
    <div className={styles.leaderboard}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <LeaderboardComponent
            data={leaderboard}
            quiz_rank={userdatafromserver?.quiz_rank}
            highest={highestquizscore}
            first_name={userdatafromserver?.first_name}
            for_game="Quiz"
            parent={true}
          />
        </div>
        <DashboardFooter />
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
      return {
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let leaderboard = await QuizApis.leaderboard({ onlyparent: true });
      let highestquizscore = await QuizApis.highestscore({
        email: response.data.data.email,
      });

      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          leaderboard: leaderboard.data.data || [],
          highestquizscore: highestquizscore?.data?.success
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
