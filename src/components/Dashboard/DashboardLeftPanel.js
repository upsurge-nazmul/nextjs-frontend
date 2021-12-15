import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Dashboard/dashboardleftpanel.module.scss";
import BlogSvg from "../SVGcomponents/BlogSvg";
import ChoresSvg from "../SVGcomponents/ChoresSvg";
import CoursesSvg from "../SVGcomponents/CoursesSvg";
import GameSvg from "../SVGcomponents/GameSvg";
import HomeSvg from "../SVGcomponents/HomeSvg";
import KidSvg from "../SVGcomponents/KidsSvg";
import LeaderboardSvg from "../SVGcomponents/LeaderboardSvg";
import Logo from "../SVGcomponents/Logo";
import MiniLogo from "../SVGcomponents/MiniLogo";
import PaymentSvg from "../SVGcomponents/PaymentSvg";
import QuizIconSvg from "../SVGcomponents/QuizIconSvg";
import RewardSvg from "../SVGcomponents/RewardSvg";
import StoreSvg from "../SVGcomponents/StoreSvg";
import CalcSvg from "../SVGcomponents/CalcSvg";
function DashboardLeftPanel({ type, hidelogo, fixed }) {
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
    <div className={`${styles.dashboardLeftPanel} ${fixed && styles.fixed}`}>
      {hidelogo ? null : width > 1300 ? (
        <Logo
          className={styles.dashboardLogo}
          onClick={() => {
            if (type === "kid") router.push("/dashboard/k");
            if (type === "waitlist") router.push("/dashboard/w");
            else router.push("/dashboard/p");
          }}
        />
      ) : (
        <MiniLogo
          className={styles.miniLogo}
          onClick={() => {
            if (type === "kid") router.push("/dashboard/k");
            if (type === "waitlist") router.push("/dashboard/w");
            else router.push("/dashboard/p");
          }}
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
      ) : type === "waitlist" ? (
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/w")}
          >
            <HomeSvg className={styles.icon} />
            <p className={styles.tabtitle}>Dashboard</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/leaderboards" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/w/leaderboards")}
          >
            <LeaderboardSvg className={styles.icon} />
            <p className={styles.tabtitle}>Leaderboards</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/games" ||
              currenttab.indexOf("dashboard/w/game") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/games")}
          >
            <GameSvg className={styles.icon} />

            <p className={styles.tabtitle}>Games</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/w/quiz" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/w/quiz")}
          >
            <QuizIconSvg className={styles.icon} />
            <p className={styles.tabtitle}>Quiz</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/w/calculators" ||
              currenttab.indexOf("/dashboard/w/calculator") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/calculators")}
          >
            <CalcSvg className={styles.icon} />
            <p className={styles.tabtitle}>Calculators</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/w/blogs" ||
              currenttab.indexOf("dashboard/w/blog/") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/blogs")}
          >
            <BlogSvg className={styles.icon} />
            <p className={styles.tabtitle}>Blogs</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/rewards" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/w/rewards")}
          >
            <RewardSvg className={styles.icon} />
            <p className={styles.tabtitle}>Rewards</p>
          </div>
        </div>
      ) : (
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/p")}
          >
            <HomeSvg className={styles.icon} />
            <p className={styles.tabtitle}>Dashboard</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/mykids" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/p/mykids")}
          >
            <KidSvg className={styles.icon} />
            <p className={styles.tabtitle}>My Kids</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/chores" ||
              currenttab.indexOf("/dashboard/p/managechore") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/p/chores")}
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
              currenttab === "/dashboard/p/games" ||
              currenttab.indexOf("/dashboard/p/game") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/p/games")}
          >
            <GameSvg className={styles.icon} />
            <p className={styles.tabtitle}>Games</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/store" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/p/store")}
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
