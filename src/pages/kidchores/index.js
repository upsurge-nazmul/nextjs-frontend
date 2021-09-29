import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import ChoreComponent from "../../components/Dashboard/ChoreComponent";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../components/Dashboard/GameCard";
import LiveClass from "../../components/Dashboard/LiveClass";
import ChoreModal from "../../components/Chores/ChoreModal";
import ChorePending from "../../components/Chores/ChorePending";
import ChoreTemplate from "../../components/Chores/ChoreTemplate";
import styles from "../../styles/kidchores/kidchores.module.scss";
import KidChore from "../../components/KidDashboard/KidChore";
import BadgeSection from "../../components/KidDashboard/BadgeSection";
import KidCompletedChore from "../../components/KidChorePage/KidCompletedChore";
import HeadingArrow from "../../components/SVGcomponents/HeadingArrow";
import KidApis from "../../actions/apis/KidApis";
import LoginApis from "../../actions/apis/LoginApis";
import { duetimeDifference } from "../../helpers/timehelpers";
import Toast from "../../components/Toast";
import KidDashboardHeader from "../../components/KidDashboard/KidDashboardHeader";
import { MainContext } from "../../context/Main";

export default function KidChoresPage({
  choresdata,
  gamesdata,
  kiddata,
  liveclassdata,
  completedchores,
}) {
  console.log(completedchores);
  const [mode, setmode] = useState("chores");
  const [pendingchores, setpendingchores] = useState(
    choresdata.filter((item) => {
      console.log(duetimeDifference(item.due_date));

      return (
        item.completion !== "complete" &&
        duetimeDifference(item.due_date) !== "Expired"
      );
    })
  );
  const [compchores, setcompchores] = useState(completedchores);
  const { setuserdata } = useContext(MainContext);

  const [choremode, setchoremode] = useState("");
  const [showmodal, setshowmodal] = useState(false);
  const [allchores, setallchores] = useState(["", ""]);
  const [backupallchores, setbackupallchores] = useState(choresdata);
  const badges = ["", "", ""];
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    setuserdata(kiddata);
  }, []);
  return (
    <div className={styles.kidChoresPage}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />

      <ChoreModal showmodal={showmodal} setshowmodal={setshowmodal} />
      <div className={styles.contentWrapper}>
        <KidDashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.pendingChoresSection}>
              <h2 className={styles.heading}>
                In Progress
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
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
            </div>
            <div className={styles.choreSection}>
              <h2 className={styles.heading}>
                Completed Chores
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {compchores.map((data, index) => {
                  return (
                    <KidChore
                      data={data}
                      key={data.id}
                      settoastdata={settoastdata}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.flexRight}>
            <BadgeSection badges={badges} />
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
      return { props: { isLogged: false, msg } };
    } else {
      let kiddata = await getChildDetails(response.data.data.user_id, token);
      let gamesdata = await getgames(token);
      let liveclassdata = await getliveclasses(token);
      let choresdata = await getchores(response.data.data.user_id, token);
      let completedchores = await getcompletedchores(
        response.data.data.user_id,
        token
      );
      return {
        props: {
          isLogged: true,
          choresdata: choresdata || [],
          gamesdata,
          kiddata,
          liveclassdata,
          completedchores,
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
async function getChildDetails(id, token) {
  let response = await DashboardApis.getChildDetails({ id }, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getchores(id, token) {
  let response = await KidApis.getchildchores({ id }, token);
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
async function getcompletedchores(id, token) {
  let response = await KidApis.getchildchores({ id, type: "completed" }, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  }
}
