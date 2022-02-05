import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import ChoreComponent from "../../../components/Dashboard/ChoreComponent";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import KidComponent from "../../../components/Dashboard/KidComponent";
import NoKid from "../../../components/Dashboard/NoKid";
import LeftPanel from "../../../components/LeftPanel";
import HeadingArrow from "../../../components/SVGcomponents/HeadingArrow";
import ChoreApis from "../../../actions/apis/ChoreApis";
import styles from "../../../styles/Dashboard/dailyquestion.module.scss";
import Toast from "../../../components/Toast";
import { Calc_Data } from "../../../static_data/Calc_Data";
import Image from "next/image";
import MiniCalcCard from "../../../components/Calculators/MiniCalcCard";
import FillSpace from "../../../components/Dashboard/FillSpace";
import Refer from "../../../components/WaitlistDashboard/Refer";
import AvailablePointsSection from "../../../components/ParentStore/AvailablePointsSection";
import TodaysQuestion from "../../../components/WaitlistDashboard/TodaysQuestion";
import QuizApis from "../../../actions/apis/QuizApis";

export default function DailyQuestion({ userdatafromserver, todaysquestion }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const router = useRouter();
  const [mode, setmode] = useState("Question a day");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  return (
    <div className={styles.invitepage}>
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Toast data={toastdata} />
      <DashboardLeftPanel />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />

        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            {todaysquestion && <TodaysQuestion data={todaysquestion} />}
          </div>
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
      return {
        props: { isLogged: false, msg: msg || "Error" },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let tq = await QuizApis.todaysquestion(null, token);

      return {
        props: {
          isLogged: true,
          todaysquestion: tq?.data?.success ? tq.data.data : null,
          userdatafromserver: response.data.data,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token", choresdata: [] },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
