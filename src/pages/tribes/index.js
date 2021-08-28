import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import ChoreModal from "../../components/Chores/ChoreModal";
import styles from "../../styles/Tribes/tribesPage.module.scss";
import TribeComponent from "../../components/Tribes/TribeComponent";
import { useRouter } from "next/dist/client/router";
import HeadingArrow from "../../components/SVGcomponents/HeadingArrow";

export default function TribesPage() {
  const [mode, setmode] = useState("Tribes  ");
  const [chores, setchores] = useState(["", "", ""]);
  const [choremode, setchoremode] = useState("");
  const [showmodal, setshowmodal] = useState(false);
  const [allchores, setallchores] = useState([]);
  const [backupallchores, setbackupallchores] = useState([]);
  const router = useRouter();
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
    <div className={styles.tribesPage}>
      <DashboardLeftPanel />
      <ChoreModal showmodal={showmodal} setshowmodal={setshowmodal} />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.pendingChoresSection}>
              <h2 className={styles.heading}>
                My Tribes
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {chores.map((item, index) => {
                  return <TribeComponent key={"pendingchore" + index} />;
                })}
              </div>
            </div>{" "}
          </div>

          <div className={styles.flexRight}>
            <div
              className={`${styles.templateSection} ${
                false ? styles.nokidlivesection : ""
              }`}
            >
              <h2 className={styles.heading}>
                Create a tribe
                <HeadingArrow />
              </h2>
              <div
                className={styles.button}
                onClick={() => {
                  router.push("/addtribe");
                }}
              >
                New Tribe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
