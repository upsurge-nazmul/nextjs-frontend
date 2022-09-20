import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState, useContext } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import ChoreComponent from "../../../components/Dashboard/ChoreComponent";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import KidComponent from "../../../components/Dashboard/KidComponent";
import NoKid from "../../../components/Dashboard/NoKid";
import LeftPanel from "../../../components/LeftPanel";
import PartnerSection from "../../../components/Home/PartnerSection";
import ChoreApis from "../../../actions/apis/ChoreApis";
import styles from "../../../styles/Dashboard/partnerpage.module.scss";
import Toast from "../../../components/Toast";
import { Calc_Data } from "../../../static_data/Calc_Data";
import Image from "next/image";
import MiniCalcCard from "../../../components/Calculators/MiniCalcCard";
import FillSpace from "../../../components/Dashboard/FillSpace";
import Refer from "../../../components/WaitlistDashboard/Refer";
import Tour from "../../../components/Tour/Tour";
import { MainContext } from "../../../context/Main";
import PageTitle from "../../../components/PageTitle";

export default function Partners({ userdatafromserver }) {
  const { setuserdata } = useContext(MainContext);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
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
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);

  return (
    <div className={styles.partnerpage}>
      <PageTitle />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Toast data={toastdata} />
      <DashboardLeftPanel
        setStoryIndex={setStoryIndex}
        disableClicks={storyIndex === 2}
      />
      {router.query.showTour && (
        <Tour
          story={[
            {
              ref: "#partner-section",
              position: "top",
              content: `These are our partners.`,
              superimpose: true,
              required: true,
              isolate: true,
            },
            {
              ref: "#toggle-leftpanel",
              position: "top",
              content: `Click here to expand resources.`,
              superimpose: true,
              required: true,
              isolate: true,
              disableBtns: true,
              highlightBg: true,
            },
            {
              ref: "#toggle-leftpanel",
              position: "bottom",
              content: `You can checkout all the resources later, lets head on to settings.`,
              superimpose: true,
              required: true,
              isolate: true,
              highlightBg: true,
            },
            {
              ref: "#header-settings",
              position: "bottom-left",
              content: `Clicking on your avatar will open settings menu.`,
              superimpose: true,
              required: true,
              disableBtns: true,
              isolate: true,
              highlightBg: true,
            },
            {
              ref: "#menu-main-payments",
              position: "left",
              content: `Great! now lets checkout payments.`,
              superimpose: true,
              isolate: true,
              required: true,
              delay: true,
            },
          ]}
          current={storyIndex}
          setcurrent={setStoryIndex}
          showtour={true}
        />
      )}
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          setStoryIndex={setStoryIndex}
        />
        <div className={styles.mainContent}>
          <PartnerSection dashboard />
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
