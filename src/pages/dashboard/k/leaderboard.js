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
import { TABS } from "../../../static_data/Leaderboard_Data";
import PageTitle from "../../../components/PageTitle";

export default function Leaderboards({ userdatafromserver, dailyLeaderboard }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [showToolTip, setShowToolTip] = useState({
    show: false,
    msg: "",
  });
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Leaderboard");
  const [tab, setTab] = useState(TABS[0]);
  const [leaderboardData, setLeaderboardData] = useState();
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);

  useEffect(() => {
    if (tab) {
      async function fetchLeaderboardData() {
        let response = await DashboardApis.getoverallleaderboard({
          type: tab.key,
        });
        if (response && response.data && response.data.success) {
          setLeaderboardData(response.data.data);
        } else {
          setLeaderboardData([]);
        }
      }
      fetchLeaderboardData();
    }
  }, [tab]);

  return (
    <div className={styles.leaderboard}>
      <PageTitle title={`upsurge | Leaderboard`} />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
          setShowToolTip={setShowToolTip}
          showToolTip={showToolTip}
        />
        <div className={styles.mainContent}>
          <ChildLeaderboard
            data={leaderboardData}
            tab={tab}
            setTab={setTab}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    return {
      props: {
        userdatafromserver: response.data.data,
      },
    };
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
