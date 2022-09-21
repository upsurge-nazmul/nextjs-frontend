import React, { useContext, useState } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Leaderboard/leaderboard.module.scss";

const TABS = [
  { key: "daily", name: "Daily" },
  { key: "monthly", name: "Monthly" },
];

export default function ChildLeaderboard({ data }) {
  const [tab, setTab] = useState(TABS[0]);
  const { userdata } = useContext(MainContext);

  return (
    <div className={styles.leaderboard}>
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
      <div className={styles.table}>
        <div className={styles.row}>
          <p className={styles.rank}>Rank</p>
          <p className={styles.name}>Name</p>
          <p className={styles.score}>Score</p>
        </div>
        {data &&
          data.map((item, index) => {
            return (
              <div className={styles.row} key={item?.id || item.name + index}>
                <p className={styles.rank}>{index + 1}</p>
                <p className={styles.name}>
                  {item.user_name ||
                    item.nickname ||
                    item.name ||
                    item.first_name}{" "}
                  {item.id === userdata?.user_id && "(you)"}
                </p>
                <p className={styles.score}>
                  {item.score ??
                    (item.num_unicoins > 1000
                      ? item.num_unicoins / 1000 + "K "
                      : item.num_unicoins)}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
