import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import ChoreComponent from "../../../components/Dashboard/ChoreComponent";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../components/Dashboard/GameCard";
import LiveClass from "../../../components/Dashboard/LiveClass";
import ChoreModal from "../../../components/Chores/ChoreModal";
import ChorePending from "../../../components/Chores/ChorePending";
import ChoreTemplate from "../../../components/Chores/ChoreTemplate";
import styles from "../../../styles/kidchores/kidchores.module.scss";
import KidChore from "../../../components/KidDashboard/KidChore";
import BadgeSection from "../../../components/KidDashboard/BadgeSection";
import KidCompletedChore from "../../../components/KidChorePage/KidCompletedChore";
import HeadingArrow from "../../../components/SVGcomponents/HeadingArrow";
import KidApis from "../../../actions/apis/KidApis";
import LoginApis from "../../../actions/apis/LoginApis";
import { duetimeDifference } from "../../../helpers/timehelpers";
import Toast from "../../../components/Toast";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";
import { MainContext } from "../../../context/Main";
import NoChores from "../../../components/KidDashboard/NoChores";
import FillSpace from "../../../components/Dashboard/FillSpace";
import LevelComponent from "../../../components/Dashboard/LevelComponent";
import ChoreApis from "../../../actions/apis/ChoreApis";
import LeaderBoard from "../../../components/LeaderBoard";

export default function KidChoresPage({
  choresdata,
  gamesdata,
  kiddata,
  userdataFromServer,
  liveclassdata,
  completedchores,
  currentLevel,
  choresLeaderboardData,
}) {
  const [mode, setmode] = useState("Chores");
  const [pendingchores, setpendingchores] = useState();
  const { userdata, setuserdata } = useContext(MainContext);

  const [choremode, setchoremode] = useState("");
  const [showmodal, setshowmodal] = useState(false);
  const [allchores, setallchores] = useState(["", ""]);
  const [showlevels, setshowlevels] = useState(false);
  const badges = ["", "", ""];
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    setuserdata(userdataFromServer);
  }, []);

  useEffect(() => {
    if (choresdata) {
      let pcs = choresdata.filter((item) => {
        if (item.is_reoccurring && JSON.stringify(item.latest_chore) !== "{}") {
          return (
            item.latest_chore.completion !== "complete" &&
            duetimeDifference(item.latest_chore.due_date) !== "Expired"
          );
        } else
          return (
            item.completion !== "complete" &&
            duetimeDifference(item.due_date) !== "Expired"
          );
      });
      setpendingchores(pcs);
    }
  }, [choresdata]);

  return (
    <div className={styles.kidChoresPage}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      {showlevels && <LevelComponent setshow={setshowlevels} />}
      <ChoreModal showmodal={showmodal} setshowmodal={setshowmodal} />

      <div className={styles.contentWrapper}>
        <DashboardHeader mode={"Chores"} settoastdata={settoastdata} />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div>
              <LeaderBoard data={choresLeaderboardData} />
            </div>
            <div className={styles.pendingChoresSection}>
              <h2 className={styles.heading}>In Progress</h2>
              <div className={styles.wrapper}>
                {pendingchores && pendingchores?.length > 0 ? (
                  <div className={styles.chores}>
                    {pendingchores.map((item, index) => {
                      return (
                        <KidChore
                          data={item}
                          key={"pendingchore" + index}
                          settoastdata={settoastdata}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <FillSpace text="Currently there are no Chores pending." />
                )}
              </div>
            </div>
          </div>

          <div className={styles.flexRight}>
            {/* <div className={styles.badgeSection}>
              <h2 className={styles.heading}>Current Badge</h2>
              <div className={styles.wrapper}>
                <div
                  className={styles.badge}
                  onClick={() => setshowlevels(true)}
                >
                  <img
                    src={"/images/badges/badge_" + currentLevel + ".svg"}
                    alt=""
                  />
                  <p className={styles.level}>Level {currentLevel}</p>
                </div>
              </div>
            </div> */}
            <div className={styles.choreSection}>
              <h2 className={styles.heading}>Completed Chores</h2>
              <div className={styles.wrapper}>
                {completedchores && completedchores.length > 0 ? (
                  <div className={styles.chores}>
                    {completedchores.map((data, index) => {
                      return (
                        <KidChore
                          data={data}
                          key={data.id}
                          settoastdata={settoastdata}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <FillSpace text="You have not completed any chore" />
                )}
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
      let kiddata = await getChildDetails(response.data.data.user_id, token);
      let gamesdata = await getgames(token);
      let liveclassdata = await getliveclasses(token);
      let choresdata = await getchores(response.data.data.user_id, token);
      let completedchores = await getcompletedchores(
        response.data.data.user_id,
        token
      );
      let currentLevel = await KidApis.getlevel(
        {
          id: response.data.data.user_id,
        },
        token
      );
      let choresLeaderboardData = await getLeaderboard(token);
      return {
        props: {
          isLogged: true,
          choresdata: choresdata || [],
          gamesdata: gamesdata || null,
          currentLevel:
            currentLevel && currentLevel.data && currentLevel.data.success
              ? currentLevel.data.data
              : 1,
          kiddata,
          userdataFromServer: response.data.data,
          liveclassdata: liveclassdata || null,
          completedchores,
          choresLeaderboardData,
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
  else return null;
}
async function getchores(id, token) {
  let response = await ChoreApis.getchildchores({ id }, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  } else return null;
}
async function getgames(token) {
  let response = await DashboardApis.getgames(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}
async function getliveclasses(token) {
  let response = await DashboardApis.getliveclasses(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}
async function getcompletedchores(id, token) {
  let response = await ChoreApis.getchildchores(
    { id, type: "completed" },
    token
  );
  if (response && response.data && response.data.data) {
    return response.data.data;
  } else return null;
}
async function getLeaderboard(token) {
  let response = await ChoreApis.getLeaderboard({ role: "parent" }, token);
  return response?.data?.data ?? [];
}
