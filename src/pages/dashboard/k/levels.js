import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";
import Toast from "../../../components/Toast";
import styles from "../../../styles/levels.module.scss";
export default function Levels() {
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [mode, setmode] = useState("Levels");
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    const scrollContainer = document.querySelector("#levelwrapper");
    if (!scrollContainer) return;

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY * 5;
    });
  }, []);
  return (
    <div className={styles.levels}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <KidDashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexTop} id="levelwrapper">
            {levels.map((item, index) => {
              return (
                <div className={styles.level} key={"level" + index}>
                  <img src={"/images/badges/badge_" + item + ".svg"}></img>
                  <p className={styles.levelName}>Level {item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
