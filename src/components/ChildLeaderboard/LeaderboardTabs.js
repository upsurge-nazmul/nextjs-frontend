import styles from "../../styles/Leaderboard/leaderboardTabs.module.scss";
import { TABS } from "../../static_data/Leaderboard_Data";
import MonthInput from "./MonthInput";

export default function LeaderboardTabs({
  tab,
  setTab,
  selectedDate,
  setSelectedDate,
}) {
  return (
    <div className={styles.leaderboardTabs}>
      <div className={styles.holder}>
        {TABS.map((item, index) => (
          <p
            className={`${styles.heading} ${
              tab.key === item.key && styles.selected
            }`}
            key={item.key + index}
            onClick={() => {
              setTab(item);
            }}
          >
            {item.name}
          </p>
        ))}
      </div>
      {tab.key === TABS[1].key ? (
        <MonthInput {...{ selectedDate, setSelectedDate }} />
      ) : (
        <></>
      )}
    </div>
  );
}
