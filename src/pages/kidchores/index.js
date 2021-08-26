import React, { useEffect, useState } from "react";
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

export default function KidChoresPage() {
  const [mode, setmode] = useState("chores");
  const [chores, setchores] = useState(["", "", "", "", ""]);
  const [choremode, setchoremode] = useState("");
  const [showmodal, setshowmodal] = useState(false);
  const [allchores, setallchores] = useState(["", ""]);
  const [backupallchores, setbackupallchores] = useState([]);
  const badges = ["", "", ""];
  useEffect(() => {
    getchores();
    getallchores();
    async function getallchores() {
      let response = await DashboardApis.getchores();
      if (response.data.data) {
        setallchores(response.data.data);
        setbackupallchores(response.data.data);
        setchoremode("inprogress");
      }
    }
    async function getchores() {
      let response = await DashboardApis.getcompletedchores();
      if (response.data.data) {
        setchores(response.data.data);
      }
    }
  }, []);

  useEffect(() => {
    if (choremode === "inprogress") {
      setallchores(
        backupallchores.filter((item) => item.completion === "pending")
      );
    } else if (choremode === "completed") {
      setallchores(
        backupallchores.filter((item) => item.completion === "completed")
      );
    } else if (choremode === "archived") {
      setallchores(
        backupallchores.filter((item) => item.completion === "archived")
      );
    }
  }, [choremode]);
  return (
    <div className={styles.kidChoresPage}>
      <DashboardLeftPanel />
      <ChoreModal showmodal={showmodal} setshowmodal={setshowmodal} />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.pendingChoresSection}>
              <h2 className={styles.heading}>
                In Progress
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {chores.map((item, index) => {
                  return <KidChore data={item} key={"pendingchore" + index} />;
                })}
              </div>
            </div>
            <div className={styles.choreSection}>
              <h2 className={styles.heading}>
                Completed Chores
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {allchores.map((data, index) => {
                  return (
                    <KidCompletedChore
                      data={data}
                      key={"chorecomponent" + index}
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
