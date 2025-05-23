import React, { useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Leaderboard/leaderboard.module.scss";
import LeaderboardBanner from "./LeaderboardBanner";
import LeaderboardTable from "./LeaderboardTable";
import LeaderboardTabs from "./LeaderboardTabs";

export default function ChildLeaderboard({
  data,
  tab,
  setTab,
  selectedDate,
  setSelectedDate,
}) {
  const { userdata } = useContext(MainContext);

  return (
    <div className={styles.leaderboard}>
      <LeaderboardBanner />
      <LeaderboardTabs {...{ tab, setTab, selectedDate, setSelectedDate }} />
      <LeaderboardTable data={data} userdata={userdata} />
    </div>
  );
}
