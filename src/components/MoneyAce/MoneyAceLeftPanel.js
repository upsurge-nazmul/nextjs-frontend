import React from "react";
import styles from "../../styles/MoneyAce/leftpanel.module.scss";
import HomeSvg from "../SVGcomponents/MoneyAce/ui/HomeSvg";
import TasksSvg from "../SVGcomponents/MoneyAce/ui/TasksSvg";
import GameSvg from "../SVGcomponents/MoneyAce/ui/GameSvg";
import LeaderboardIcon from "../SVGcomponents/MoneyAce/ui/LeaderboardIcon";
import BackSvg from "../SVGcomponents/MoneyAce/ui/BackSvg";
export default function MoneyAceLeftPanel({
  currenttab,
  newtasks,
  setcurrenttab,
  setstage,
}) {
  return (
    <div className={styles.leftpanel}>
      <HomeSvg
        className={styles.icon}
        onClick={() => setcurrenttab("dashboard")}
      />
      <TasksSvg
        className={styles.icon}
        onClick={() => setcurrenttab("tasks")}
      />
      <GameSvg
        className={styles.icon}
        onClick={() => setcurrenttab("citymap")}
      />
      <LeaderboardIcon
        className={styles.icon}
        onClick={() => setcurrenttab("leaderboard")}
      />
      <BackSvg
        className={styles.icon}
        onClick={() => {
          if (currenttab === "dashboard") {
            setstage("welcome");
          } else setcurrenttab("dashboard");
        }}
      />
    </div>
  );
}
