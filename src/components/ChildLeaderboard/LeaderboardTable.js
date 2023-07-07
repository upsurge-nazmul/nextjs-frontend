import styles from "../../styles/Leaderboard/leaderboardTable.module.scss";
import CrownCircle from "../SVGcomponents/leaderboard/CrownCircleSVG";
export default function LeaderboardTable({ data, userdata }) {
  const colors = ["#FFC700","#C6C6C6","#FFA96A"];
  const whiteColor = ["","#fff"];
  return (
    <div className={styles.table}>
      <div className={styles.tableHead}>
        <p className={styles.ranklabel}>Rank</p>
        <p className={styles.namelabel}>Name</p>
        <p className={styles.scorelabel}>Score</p>
      </div>
      {data &&
        data.length &&
        data.map((item, index) => {
          return (
            <div className={styles.row} key={item?.id || item.name + index}>
              <p className={styles.rank}>{index + 1}
              <CrownCircle color={colors[index]} whiteColor={whiteColor[index]} />
              </p>
              <p className={styles.name}>
                {item.user_name ||
                  item.nickname ||
                  item.name ||
                  item.first_name}{" "}
                {item.id === userdata?.user_id && "(you)"}
              </p>
              <p className={styles.score}>
                
                {(item.total_unicoins > 1000
                    ? item.total_unicoins / 1000 + "K "
                    : item.total_unicoins) ??
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
