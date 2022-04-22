import React, { useState } from "react";
import styles from "../../styles/StockSimulator/leaderboard.module.scss";

export default function Leaderboard({ data, personal_rank }) {
  const [selected, setselected] = useState("Overall");
  const [leaderboarddata, setleaderboarddata] = useState(data || []);
  const [options, setoptions] = useState(["Overall", "Quiz", "Ludo"]);

  async function changeleaderboard(type) {
    setselected(type);
  }

  return (
    <div className={styles.leaderboard}>
      <div className={styles.holder}>
        {options.map((item) => (
          <p
            className={`${styles.heading} ${
              selected === item && styles.selected
            }`}
            key={item}
            onClick={() => {
              changeleaderboard(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
      <div className={styles.section}>
        <div className={styles.table}>
          <div className={styles.row}>
            <p className={styles.rank}>Rank</p>
            <p className={styles.name}>Name</p>
            <p className={styles.score}>Score</p>
          </div>
          {leaderboarddata.map((item, index) => {
            return (
              <div
                className={styles.row}
                key={data.id ?? item.name + index}
                style={{
                  backgroundColor: index % 2 == 0 ? "#D9F2FF" : "#ffffff",
                }}
              >
                <p className={styles.rank}>{index + 1}</p>
                <p className={styles.name}>
                  {item.user_name ||
                    item.nickname ||
                    item.name ||
                    item.first_name}{" "}
                  {Number(personal_rank) === index + 1 && "(you)"}
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
    </div>
  );
}
