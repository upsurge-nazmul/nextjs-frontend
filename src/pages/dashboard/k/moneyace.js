import React, { useState, useContext, useEffect } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";
import Welcome from "../../../components/MoneyAce/Welcome";
import Toast from "../../../components/Toast";
import styles from "../../../styles/kidDashboard/moneyace.module.scss";
import { MainContext } from "../../../context/Main";
import MoneyAceDashboard from "../../../components/MoneyAce/MoneyAceDashboard";

export default function Moneyace({ userdatafromserver }) {
  const { setuser, userdata, setuserdata, showmenu, setshowmenu } =
    useContext(MainContext);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [volume, setvolume] = useState(1);
  const [stage, setstage] = useState("welcome");
  const [muted, setmuted] = useState(false);
  useEffect(() => {
    if (!userdatafromserver) return;
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  return (
    <div className={styles.moneyAce}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <KidDashboardHeader mode={"Money Ace"} settoastdata={settoastdata} />
        <div className={styles.mainContent}>
          <div className={styles.gameMain}>
            {stage === "welcome" ? (
              <Welcome
                muted={muted}
                setmuted={setmuted}
                setvolume={setvolume}
                volume={volume}
                avatarUrl={userdatafromserver.user_img_url}
                username={userdatafromserver.user_name}
                fullName={
                  userdatafromserver.first_name +
                  " " +
                  userdatafromserver.last_name
                }
                setstage={setstage}
              />
            ) : stage === "dashboard" ? (
              <MoneyAceDashboard
                muted={muted}
                setmuted={setmuted}
                setvolume={setvolume}
                volume={volume}
                avatarUrl={userdatafromserver.user_img_url}
                username={userdatafromserver.user_name}
                fullName={
                  userdatafromserver.first_name +
                  " " +
                  userdatafromserver.last_name
                }
                setstage={setstage}
              />
            ) : null}
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
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      return {
        props: {
          userdatafromserver:
            response && response.data && response.data.data
              ? response.data.data
              : [],
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
