import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import Toast from "../../../components/Toast";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/kidDashboard/kiddashboard.module.scss";
import ProfileSection from "../../../components/KidDashboard/ProfileSection";
import KidChore from "../../../components/KidDashboard/KidChore";
import KidCourses from "../../../components/KidDashboard/KidCourses";
import GameCard from "../../../components/Dashboard/GameCard";
import Badge from "../../../components/KidDashboard/Badge";
import BadgeSection from "../../../components/KidDashboard/BadgeSection";
import NextChores from "../../../components/KidDashboard/NextChores";
import TribeSection from "../../../components/KidDashboard/TribeSection";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";
import HeadingArrow from "../../../components/SVGcomponents/HeadingArrow";
import KidApis from "../../../actions/apis/KidApis";
import { MainContext } from "../../../context/Main";
import NoChores from "../../../components/KidDashboard/NoChores";
import { getMessaging, getToken } from "@firebase/messaging";
import NotificationApis from "../../../actions/apis/NotificationApis";

function KidDashboard({
  isLogged,
  msg,
  choresdata,
  gamesdata,
  liveclassdata,
  badgeData,
  kiddata,
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const [mode, setmode] = useState("home");
  const { setuserdata } = useContext(MainContext);
  const router = useRouter();
  const [familyfun, setfamilyfun] = useState(gamesdata || []);
  const [chores, setchores] = useState(choresdata || []);
  const [liveclasses, setliveclasses] = useState(liveclassdata || []);
  const [badges, setbadges] = useState(["", "", ""]);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
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
  useEffect(() => {
    setuserdata(kiddata);
  }, []);
  useEffect(() => {
    saveNotificationToken();
    async function saveNotificationToken() {
      let messaging = getMessaging();
      let token = "";
      try {
        token = await getToken(messaging);
      } catch (err) {
        settoastdata({
          show: true,
          msg: "Notifications Blocked",
          type: "error",
        });
      }
      let response = await NotificationApis.addToken({ type: "web", token });
    }
  }, []);
  return (
    <div className={styles.kiddashboard}>
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
            <div className={`${styles.liveClassSection}`}>
              <h2 className={styles.heading}>
                My Knowledge Quests
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

            <div className={styles.choreSection}>
              <h2 className={styles.heading}>
                My Chores
                <HeadingArrow />
              </h2>

              {chores.length > 0 ? (
                <div className={styles.wrapper}>
                  {chores.map((chore, index) => {
                    return (
                      <KidChore
                        settoastdata={settoastdata}
                        data={chore}
                        key={chore.id}
                      />
                    );
                  })}
                </div>
              ) : (
                <NoChores />
              )}
            </div>
          </div>
          <div className={styles.flexRight}>
            <BadgeSection badges={badges} />
            {/* <NextChores /> */}
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
      return {
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      if (response.data.data.is_waiting_active) {
        return {
          props: { isLogged: false, msg: msg || "Error" },
          redirect: {
            permanent: false,
            destination: "/dashboard/w",
          },
        };
      }
      if (response.data.data.user_type === "parent") {
        return {
          props: { isLogged: false, msg: msg || "Error" },
          redirect: {
            permanent: false,
            destination: "/dashboard/p",
          },
        };
      }

      let kiddata = await getChildDetails(response.data.data.user_id, token);
      let gamesdata = await getgames(token);
      let liveclassdata = await getliveclasses(token);
      let choresdata = await getchores(response.data.data.user_id, token);
      let badgeData = await getbadges(response.data.data.user_id, token);
      return {
        props: {
          isLogged: true,
          choresdata: choresdata || [],
          gamesdata,
          kiddata,
          liveclassdata,
          badgeData,
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
async function getChildDetails(id, token) {
  let response = await DashboardApis.getChildDetails({ id }, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getchores(id, token) {
  let response = await KidApis.getchildchores({ id }, token);
  console.log(response.data);
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
async function getbadges(childId, token) {
  let response = await KidApis.getbadges({ childId }, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
