import React from "react";
import styles from "../../styles/WaitlistDashboard/leaderboard.module.scss";
export default function Leaderboards({ data }) {
  return (
    <div className={styles.leaderboard}>
      <p className={styles.heading}>Leaderboards</p>
      <div className={styles.section}>
        <p className={styles.subheading}>Quiz</p>
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
                  backgroundColor: index % 2 == 0 ? "#00000034" : "transparent",
                }}
              >
                <p className={styles.rank}>{index + 1}</p>
                <p className={styles.name}>{item.nick_name || item.name}</p>
                <p className={styles.score}>{item.score}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.section}>
        <p className={styles.subheading}>Quiz</p>
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
                  backgroundColor: index % 2 == 0 ? "#00000034" : "transparent",
                }}
              >
                <p className={styles.rank}>{index + 1}</p>
                <p className={styles.name}>{item.nick_name || item.name}</p>
                <p className={styles.score}>{item.score}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.section}>
        <p className={styles.subheading}>Quiz</p>
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
                  backgroundColor: index % 2 == 0 ? "#00000034" : "transparent",
                }}
              >
                <p className={styles.rank}>{index + 1}</p>
                <p className={styles.name}>{item.nick_name || item.name}</p>
                <p className={styles.score}>{item.score}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
