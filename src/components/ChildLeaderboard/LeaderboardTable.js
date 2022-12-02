import styles from "../../styles/Leaderboard/leaderboardTable.module.scss";

export default function LeaderboardTable({ data, userdata }) {
  return (
    <div className={styles.table}>
      <div className={styles.tableHead}>
        <p className={styles.rank}>Rank</p>
        <p className={styles.name}>Name</p>
        <p className={styles.score}>Score</p>
      </div>
      {data &&
        data.length &&
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
  );
}
