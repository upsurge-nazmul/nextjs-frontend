import React, { useContext, useEffect, useState } from "react";
import Toast from "../../../../components/Toast";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../../../styles/kidDashboard/tribemainpage.module.scss";
import HeadingArrow from "../../../../components/SVGcomponents/HeadingArrow";
import { MainContext } from "../../../../context/Main";
import LoginApis from "../../../../actions/apis/LoginApis";
import FreeGameApis from "../../../../actions/apis/FreeGameApis";
import TribeApis from "../../../../actions/apis/TribeApis";
import { Game_Data } from "../../../../static_data/Game_Data";
import KidDashboardHeader from "../../../../components/KidDashboard/KidDashboardHeader";
import TribeCard from "../../../../components/KidDashboard/TribeCard";
export default function Games({ userdatafromserver, tribedetails }) {
  // modes are different pages like home,kids,store,payments,notifications
  console.log(tribedetails);
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Tribe");
  const [recent_games, setrecent_games] = useState([]);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  return (
    <div className={styles.tribepage}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <KidDashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.top}>
              <img
                src={
                  tribedetails.tribe_img_url ||
                  "https://i.ibb.co/v3vVV8r/default-avatar.png"
                }
                alt=""
              />
              <div className={styles.right}>
                <p className={styles.name}>{tribedetails.name}</p>
                <p className={styles.description}>{tribedetails.description}</p>
              </div>
            </div>
          </div>
          <div className={styles.flexRight}></div>
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
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let tribedata = await TribeApis.gettribedetail(
        { id: params.tribeid },
        token
      );
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          tribedetails:
            tribedata && tribedata.data && tribedata.data.success
              ? tribedata.data.data
              : null,
          token: token,
        },
      };
    }
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
