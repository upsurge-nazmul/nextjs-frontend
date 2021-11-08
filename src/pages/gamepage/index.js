import React, { useContext, useEffect, useState } from "react";
import Toast from "../../components/Toast";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Dashboard/gamespage.module.scss";
import HeadingArrow from "../../components/SVGcomponents/HeadingArrow";
import { MainContext } from "../../context/Main";
import LoginApis from "../../actions/apis/LoginApis";
function Games() {
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Games");
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    const scrollContainer1 = document.querySelector("#gamecardwrapper1");
    const scrollContainer2 = document.querySelector("#gamecardwrapper2");
    if (!scrollContainer1) return;
    if (!scrollContainer2) return;
    scrollContainer1.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer1.scrollLeft += evt.deltaY;
    });
    scrollContainer2.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer2.scrollLeft += evt.deltaY;
    });
    return () => {
      scrollContainer1.removeEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer1.scrollLeft += evt.deltaY;
      });
      scrollContainer2.removeEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer2.scrollLeft += evt.deltaY;
      });
    };
  }, []);
  let arr = ["x", "x", "x", "x", "x"];
  return (
    <div className={styles.gamesPage}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.recentSection}>
              <h2 className={styles.heading}>
                Recently Played
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper} id="gamecardwrapper2">
                {arr.map((item, index) => {
                  return <GameCard data={item} key={"kidcomponent" + index} />;
                })}
              </div>
            </div>
            <div className={styles.availableSection}>
              <h2 className={styles.heading}>
                Available Games
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {arr.map((data, index) => {
                  return (
                    <GameCard data={data} key={"chorecomponent" + index} />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.flexRight}>
            <div className={styles.familyfunSection}>
              <h2 className={styles.heading}>
                Family Fun
                <HeadingArrow />
              </h2>

              <div className={styles.wrapper} id="gamecardwrapper1">
                {arr.map((data, index) => {
                  return (
                    <GameCard data={data} key={"gamecardcomponent" + index} />
                  );
                })}
              </div>
            </div>

            <div className={`${styles.simulatorsSection} `}>
              <h2 className={styles.heading}>
                Simulators
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {arr.map((data, index) => {
                  return (
                    <GameCard data={data} key={"liveclasscomponent" + index} />
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

export default Games;

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
