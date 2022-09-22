import React, { useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Leaderboard/leaderboard.module.scss";
import LeaderboardTable from "./LeaderboardTable";
import LeaderboardTabs from "./LeaderboardTabs";

export default function ChildLeaderboard({ data, tab, setTab }) {
  const { userdata } = useContext(MainContext);

  return (
    <div className={styles.leaderboard}>
      <LeaderboardTabs tab={tab} setTab={setTab} />
      <LeaderboardTable data={data} userdata={userdata} />
    </div>
  );
}
