import React, { useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Leaderboard/leaderboard.module.scss";
import LeaderboardTable from "./LeaderboardTable";
import LeaderboardTabs from "./LeaderboardTabs";
import { TABS } from "../../static_data/Leaderboard_Data";
import MonthInput from "./MonthInput";

export default function ChildLeaderboard({ data, tab, setTab }) {
  const { userdata } = useContext(MainContext);

  return (
    <div className={styles.leaderboard}>
      <LeaderboardTabs tab={tab} setTab={setTab} />
      {tab.key === TABS[1].key ? <MonthInput /> : <></>}
      <LeaderboardTable data={data} userdata={userdata} />
    </div>
  );
}
