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
import styles from "../../../styles/Dashboard/partnerpage.module.scss";
import Toast from "../../../components/Toast";
import { Calc_Data } from "../../../static_data/Calc_Data";
import Image from "next/image";
import MiniCalcCard from "../../../components/Calculators/MiniCalcCard";
import FillSpace from "../../../components/Dashboard/FillSpace";
import Refer from "../../../components/WaitlistDashboard/Refer";
import AvailablePointsSection from "../../../components/ParentStore/AvailablePointsSection";

export default function Partners({ userdatafromserver }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const router = useRouter();
  const [mode, setmode] = useState("Partners");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const rewards = [
    "https://i.ibb.co/cvVkBFn/bharatpe-1008905-1626341577.png",
    "https://i.ibb.co/r487JLR/Phone-Pe-Logo-wine.png",
    "https://i.ibb.co/hLRfTs6/Cred-logo-0709211000.png",
    "https://i.ibb.co/Mpqgh6v/logo.png",
    "https://i.ibb.co/5WL7ZGS/Paytm-Logo-wine.png",
    "https://i.ibb.co/hLRfTs6/Cred-logo-0709211000.png",
    "https://i.ibb.co/Mpqgh6v/logo.png",
    "https://i.ibb.co/5WL7ZGS/Paytm-Logo-wine.png",
  ];
  return (
    <div className={styles.partnerpage}>
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
            <div className={styles.wrapper}>
              {rewards.map((item) => {
                return <img key={item} src={item} alt="" />;
              })}
            </div>
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
      return {
        props: {
          isLogged: true,
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
