import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import ChoreComponent from "../../components/Dashboard/ChoreComponent";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import ChoreModal from "../../components/Chores/ChoreModal";
import ChorePending from "../../components/Chores/ChorePending";
import ChoreTemplate from "../../components/Chores/ChoreTemplate";
import styles from "../../styles/Chores/chorepage.module.scss";
import HeadingArrow from "../../components/SVGcomponents/HeadingArrow";

function ChoresPage() {
  const [mode, setmode] = useState("chores");
  const [chores, setchores] = useState([]);
  const [choremode, setchoremode] = useState("");
  const [showmodal, setshowmodal] = useState(false);
  const [allchores, setallchores] = useState([]);
  const [backupallchores, setbackupallchores] = useState([]);

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
    <div className={styles.choresPage}>
      <DashboardLeftPanel />
      <ChoreModal showmodal={showmodal} setshowmodal={setshowmodal} />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.pendingChoresSection}>
              <h2 className={styles.heading}>
                Pending For Approval
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {chores.map((item, index) => {
                  return <ChorePending key={"pendingchore" + index} />;
                })}
              </div>
            </div>

            <div className={styles.choreSection}>
              <div className={styles.headingWrapper}>
                <h2
                  className={`${styles.heading} ${
                    choremode === "inprogress" ? styles.activechore : ""
                  }`}
                  onClick={() => setchoremode("inprogress")}
                >
                  In Progress
                </h2>
                <h2
                  className={`${styles.heading} ${
                    choremode === "completed" ? styles.activechore : ""
                  }`}
                  onClick={() => setchoremode("completed")}
                >
                  Completed
                </h2>
                <h2
                  className={`${styles.heading} ${
                    choremode === "archived" ? styles.activechore : ""
                  }`}
                  onClick={() => setchoremode("archived")}
                >
                  Archived
                </h2>
              </div>
              <div className={styles.wrapper}>
                {allchores.map((data, index) => {
                  return (
                    <ChoreComponent
                      data={data}
                      key={"chorecomponent" + index}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.flexRight}>
            <div
              className={`${styles.templateSection} ${
                false ? styles.nokidlivesection : ""
              }`}
            >
              <h2 className={styles.heading}>
                Create Chores
                <HeadingArrow />
              </h2>
              <div
                className={styles.button}
                onClick={() => {
                  setshowmodal(true);
                }}
              >
                New Chore
              </div>
              <div className={styles.subheading}>or</div>
              <div className={styles.subheading}>Use a Template</div>
              <div className={styles.wrapper}>
                <ChoreTemplate />
                <ChoreTemplate />
                <ChoreTemplate />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChoresPage;
