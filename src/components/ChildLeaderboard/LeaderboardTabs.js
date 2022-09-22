import styles from "../../styles/Leaderboard/leaderboardTabs.module.scss";
import { TABS } from "../../static_data/Leaderboard_Data";

export default function LeaderboardTabs({ tab, setTab }) {
  return (
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
  );
}
