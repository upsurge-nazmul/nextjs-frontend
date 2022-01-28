import React, { useContext, useEffect, useState } from "react";
import Toast from "../../../../components/Toast";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../../../styles/kidDashboard/tribepage.module.scss";
import HeadingArrow from "../../../../components/SVGcomponents/HeadingArrow";
import { MainContext } from "../../../../context/Main";
import LoginApis from "../../../../actions/apis/LoginApis";
import FreeGameApis from "../../../../actions/apis/FreeGameApis";
import { Game_Data } from "../../../../static_data/Game_Data";
import KidDashboardHeader from "../../../../components/KidDashboard/KidDashboardHeader";
import TribeCard from "../../../../components/KidDashboard/TribeCard";
export default function Games({ userdatafromserver, token }) {
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Tribes");
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
  const tribes = ["", "", ""];
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
            <div className={styles.recentSection}>
              <div className={styles.heading}>
                <div className="left">
                  My Tribes
                  <HeadingArrow />
                </div>
                <div
                  className={styles.createbtn}
                  onClick={() => router.push("/dashboard/k/managetribe/create")}
                >
                  + Create new Tribe
                </div>
              </div>
              <div className={styles.wrapper} id="gamecardwrapper2">
                {tribes.map((item, index) => {
                  return (
                    <TribeCard
                      onCLick={() =>
                        handlegameclick(Game_Data[item].name.replace(/ /g, ""))
                      }
                      data={Game_Data[item]}
                      key={"kidcomponent" + index}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.availableSection}>
              <h2 className={styles.heading}>
                Recent Tribe Games
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {Object.keys(Game_Data).map((item, index) => {
                  return (
                    <GameCard
                      onCLick={() =>
                        handlegameclick(Game_Data[item].name.replace(/ /g, ""))
                      }
                      data={Game_Data[item]}
                      key={"chorecomponent" + index}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.availableSection}>
              <h2 className={styles.heading}>
                Popular Tribes
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {Object.keys(Game_Data).map((item, index) => {
                  return (
                    <TribeCard
                      onCLick={() =>
                        handlegameclick(Game_Data[item].name.replace(/ /g, ""))
                      }
                      data={Game_Data[item]}
                      key={"chorecomponent" + index}
                    />
                  );
                })}
              </div>
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
        props: { isLogged: false, msg },
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
