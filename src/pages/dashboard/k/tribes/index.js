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
import TribeApis from "../../../../actions/apis/TribeApis";
export default function Games({
  userdatafromserver,
  token,
  tribes,
  populartribes,
}) {
  console.log(populartribes);
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
          <div className={styles.flexTop}>
            <div className={styles.mytribesSection}>
              <div className={styles.heading}>
                <div className={styles.left}>
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
                      data={item}
                      key={item.id}
                      onClick={() =>
                        router.push("/dashboard/k/tribes/" + item.id)
                      }
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
                {populartribes.map((item, index) => {
                  return (
                    <TribeCard
                      onClick={() =>
                        router.push("/dashboard/k/tribes/" + item.id)
                      }
                      data={item}
                      key={"pupular" + item.id}
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
    let usertribes = await TribeApis.getTribes(null, token);
    let populartribes = await TribeApis.popularTribes(null, token);
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
          tribes:
            usertribes && usertribes.data && usertribes.data.success
              ? usertribes.data.data
              : [],
          populartribes:
            populartribes && populartribes.data && populartribes.data.success
              ? populartribes.data.data
              : [],
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
