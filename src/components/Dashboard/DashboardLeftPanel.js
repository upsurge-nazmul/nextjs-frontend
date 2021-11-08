import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Dashboard/dashboardleftpanel.module.scss";
import ChoresSvg from "../SVGcomponents/ChoresSvg";
import CoursesSvg from "../SVGcomponents/CoursesSvg";
import GameSvg from "../SVGcomponents/GameSvg";
import HomeSvg from "../SVGcomponents/HomeSvg";
import KidSvg from "../SVGcomponents/KidsSvg";
import Logo from "../SVGcomponents/Logo";
import MiniLogo from "../SVGcomponents/MiniLogo";
import PaymentSvg from "../SVGcomponents/PaymentSvg";
import StoreSvg from "../SVGcomponents/StoreSvg";

function DashboardLeftPanel({ type }) {
  const router = useRouter();
  const [width, setwidth] = useState(1000);
  const [currenttab, setcurrenttab] = useState("");

  useEffect(() => {
    setcurrenttab(router.pathname);
  }, [router]);
  useEffect(() => {
    function updateSize() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      setwidth(w);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <div className={styles.dashboardLeftPanel}>
      {width > 1300 ? (
        <Logo
          className={styles.dashboardLogo}
          onClick={() => router.push("/dashboard")}
        />
      ) : (
        <MiniLogo
          className={styles.miniLogo}
          onClick={() => router.push("/dashboard")}
        />
      )}
      {type === "kid" ? (
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              currenttab === "/kiddashboard" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/kiddashboard")}
          >
            <HomeSvg className={styles.icon} />
            <p className={styles.tabtitle}>Dashboard</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/kidchores" ||
              currenttab.indexOf("/managechore") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/kidchores")}
          >
            <ChoresSvg className={styles.icon} />
            <p className={styles.tabtitle}>Chores</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/kidstore" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/kidstore")}
          >
            <StoreSvg className={styles.icon} />

            <p className={styles.tabtitle}>Store</p>
          </div>
        </div>
      ) : (
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard")}
          >
            <HomeSvg className={styles.icon} />
            <p className={styles.tabtitle}>Dashboard</p>
          </div>
          <div className={styles.tab}>
            <KidSvg className={styles.icon} />
            <p className={styles.tabtitle}>My Kids</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/chores" ||
              currenttab.indexOf("/managechore") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/chores")}
          >
            <ChoresSvg className={styles.icon} />
            <p className={styles.tabtitle}>Chores</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/courses" || currenttab.indexOf("/courses") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/courses")}
          >
            <CoursesSvg className={styles.icon} />
            <p className={styles.tabtitle}>Courses</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/gamepage" ||
              currenttab.indexOf("/gamepage") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/gamepage")}
          >
            <GameSvg className={styles.icon} />
            <p className={styles.tabtitle}>Games</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/parentstore" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/parentstore")}
          >
            <StoreSvg className={styles.icon} />
            <p className={styles.tabtitle}>Store</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardLeftPanel;
