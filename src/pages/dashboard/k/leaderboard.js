import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import DashboardApis from "../../../actions/apis/DashboardApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Curve1 from "../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../components/SVGcomponents/Curve2";
import Toast from "../../../components/Toast";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/leaderboardspage.module.scss";
import ChildLeaderboard from "../../../components/ChildLeaderboard";

export default function Leaderboards({ userdatafromserver }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("Leaderboard");
  const { setuserdata } = useContext(MainContext);

  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);

  return (
    <div className={styles.leaderboard}>
      <DashboardLeftPanel type="kid" />
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
          <ChildLeaderboard />
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
      return {
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let overallleaderboard = await DashboardApis.getoverallleaderboard(
        null,
        token
      );
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          overallleaderboard: overallleaderboard.data.data || [],
          msg: "",
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
