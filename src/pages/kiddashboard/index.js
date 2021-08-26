import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import LoginApis from "../../actions/apis/LoginApis";
import Toast from "../../components/Toast";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/kidDashboard/kiddashboard.module.scss";
import ProfileSection from "../../components/KidDashboard/ProfileSection";
import KidChore from "../../components/KidDashboard/KidChore";
import KidCourses from "../../components/KidDashboard/KidCourses";
import GameCard from "../../components/Dashboard/GameCard";
import Badge from "../../components/KidDashboard/Badge";
import BadgeSection from "../../components/KidDashboard/BadgeSection";
import NextChores from "../../components/KidDashboard/NextChores";
import TribeSection from "../../components/KidDashboard/TribeSection";
import KidDashboardHeader from "../../components/KidDashboard/KidDashboardHeader";
import HeadingArrow from "../../components/SVGcomponents/HeadingArrow";

function KidDashboard({
  isLogged,
  msg,
  choresdata,
  gamesdata,
  kidsdata,
  liveclassdata,
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const [mode, setmode] = useState("home");
  const router = useRouter();
  const [kids, setkids] = useState(kidsdata || []);
  const [familyfun, setfamilyfun] = useState(gamesdata || []);
  const [chores, setchores] = useState(choresdata || []);
  const [liveclasses, setliveclasses] = useState(liveclassdata || []);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const badges = ["", "", ""];
  const tribes = ["", "", ""];
  useEffect(() => {
    if (isLogged === false) {
      console.log(isLogged);
      settoastdata({
        show: true,
        type: "error",
        msg: msg,
      });
      router.push("/");
    }
  }, [isLogged]);

  let topusers = [
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
    {
      img_url:
        "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=24&q=80",
      name: "Jason Smith",
      votes: "12.5k",
    },
  ];
  return (
    <div className={styles.kiddashboard}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <KidDashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.gameSection}>
              <h2 className={styles.heading}>
                My Games
                <HeadingArrow />
              </h2>

              <div className={styles.wrapper}>
                {familyfun.map((data, index) => {
                  return <GameCard data={data} key={"gamecard" + index} />;
                })}
              </div>
            </div>
            {kids.length > 0 && (
              <div className={styles.choreSection}>
                <h2 className={styles.heading}>
                  My Chores
                  <HeadingArrow />
                </h2>

                <div className={styles.wrapper}>
                  <KidChore data={chores[0]} />
                  <KidChore data={chores[0]} />
                  <KidChore data={chores[0]} />
                </div>
              </div>
            )}
            <div
              className={`${styles.liveClassSection} ${
                kids.length === 0 ? styles.nokidlivesection : ""
              }`}
            >
              <h2 className={styles.heading}>
                My courses
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {liveclasses.map((data, index) => {
                  return (
                    <KidCourses
                      key={"gamecard" + index}
                      data={{
                        img_url: data.image,
                        course_progress: 50,
                        current_course: data.title,
                        subheading: data.age,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.flexRight}>
            <BadgeSection badges={badges} />
            <NextChores />
            <TribeSection tribes={tribes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default KidDashboard;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return { props: { isLogged: false, msg } };
    } else {
      let kidsdata = await getkidsdata(token);
      let gamesdata = await getgames(token);
      let liveclassdata = await getliveclasses(token);
      let choresdata = await getchores(token);

      return {
        props: {
          isLogged: true,
          choresdata,
          gamesdata,
          kidsdata,
          liveclassdata,
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
async function getkidsdata(token) {
  let response = await DashboardApis.getkids(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getchores(token) {
  let response = await DashboardApis.getpendingchores(null, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  }
}
async function getgames(token) {
  let response = await DashboardApis.getgames(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getliveclasses(token) {
  let response = await DashboardApis.getliveclasses(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
