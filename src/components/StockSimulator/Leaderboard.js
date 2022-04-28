import { useState, useEffect } from "react";
import styles from "../../styles/StockSimulator/leaderboard.module.scss";
import SimulatorApis from "../../actions/apis/SimulatorApis";

export default function Leaderboard({ userData, token }) {
  const [leaderboarddata, setleaderboarddata] = useState();
  // const [selected, setselected] = useState("Overall");
  // const [options, setoptions] = useState(["Overall", "Quiz", "Ludo"]);

  // async function changeleaderboard(type) {
  //   setselected(type);
  // }

  useEffect(() => {
    async function fetchLeaderboard() {
      let leaderboard = await SimulatorApis.getLeaderboard({
        payload: {},
        token,
      });
      if (leaderboard.data.success) {
        setleaderboarddata(leaderboard.data.data);
      }
    }
    fetchLeaderboard();
  }, [token]);

  return (
    <div className={styles.leaderboard}>
      {/* <div className={styles.holder}>
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
      </div> */}
      <div className={styles.section}>
        <div className={styles.table}>
          <div className={styles.row}>
            <p className={styles.rank}>Rank</p>
            <p className={styles.name}>Name</p>
            <p className={styles.score}>Total Portfolio</p>
          </div>
          {leaderboarddata &&
            leaderboarddata.length &&
            leaderboarddata.map((item, index) => {
              return (
                <div
                  className={styles.row}
                  key={item.user.id}
                  style={{
                    backgroundColor: index % 2 == 0 ? "#D9F2FF" : "#ffffff",
                  }}
                >
                  <p className={styles.rank}>{index + 1}</p>
                  <p className={styles.name}>
                    {item.user.first_name + " " + item.user.last_name}
                    {item.user.phone === userData.phone && " (you)"}
                  </p>
                  <p className={styles.score}>{item.record.total_portfolio}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
