import React from "react";
import styles from "../styles/Leaderboard/leaderboard.module.scss";

export default function LeaderBoard({ img, title, data }) {
  if (data?.length === 0) return null;
  else
    return (
      <div className={styles.leaderboard}>
        <div className={styles.main}>
          {img && (
            <img
              className={styles.image}
              src={
                img ||
                "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              }
              alt=""
            />
          )}
          <div className={styles.heading}>
            <p className={styles.name}>{title}</p>
            <p className={styles.text}>Leaderboard</p>
          </div>
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
          </div>
        </div>
      </div>
    );
}
