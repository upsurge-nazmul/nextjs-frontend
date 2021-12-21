import React, { useState } from "react";
import styles from "../../styles/WaitlistDashboard/leaderboard.module.scss";
export default function LeaderboardComponent({ data, highest }) {
  const [selected, setselected] = useState("Quiz");
  function gettext(num) {
    if (num === 2) {
      if (selected === "Quiz") {
        return "Money Run";
      }
      if (selected === "Money Run") {
        return "Quiz";
      } else {
        return "Quiz";
      }
    }
    if (num === 3) {
      if (selected === "Quiz") {
        return "Ludo";
      }
      if (selected === "Money Run") {
        return "Ludo";
      } else {
        return "Money Run";
      }
    }
  }
  return (
    <div className={styles.leaderboard}>
      <div className={styles.holder}>
        <p className={`${styles.heading} ${styles.selected}`}>{selected}</p>
        {/* <p
          className={styles.heading}
          onClick={() =>
            setselected(selected === "Quiz" ? "Money Run" : "Quiz")
          }
        >
          {gettext(2)}
        </p>
        <p
          className={styles.heading}
          onClick={() =>
            setselected(
              selected === "Quiz"
                ? "Ludo"
                : selected === "Money Run"
                ? "Ludo"
                : "Money Run"
            )
          }
        >
          {gettext(3)}
        </p> */}
      </div>
      <div className={styles.section}>
        <p className={styles.subheading}>{selected}</p>
        <div className={styles.table}>
          <div className={styles.row}>
            <p className={styles.rank}>Rank</p>
            <p className={styles.name}>Name</p>
            <p className={styles.score}>Score</p>
          </div>
          {data.map((item, index) => {
            return (
              <div
                className={styles.row}
                key={data.id ?? item.name + index}
                style={{
                  backgroundColor: index % 2 == 0 ? "#D9F2FF" : "#ffffff",
                }}
              >
                <p className={styles.rank}>{index + 1}</p>
                <p className={styles.name}>{item.nick_name || item.name}</p>
                <p className={styles.score}>{item.score}</p>
              </div>
            );
          })}
          <div
            className={styles.row}
            key={"sdaoijwq"}
            style={{
              backgroundColor: data.length % 2 == 0 ? "#D9F2FF" : "#ffffff",
              padding: "20px 40px",
            }}
          >
            <p className={styles.rank}>Your highest</p>
            <p className={styles.name}></p>
            <p className={styles.score}>{highest}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
