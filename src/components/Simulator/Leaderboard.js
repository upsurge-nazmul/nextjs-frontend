import { useState, useEffect } from "react";
import styles from "../../styles/StockSimulator/leaderboard.module.scss";
import SimulatorApis from "../../actions/apis/SimulatorApis";
import StarIcon from "@mui/icons-material/Star";

export default function Leaderboard({ userData, token, simulatorType }) {
  const [leaderboarddata, setleaderboarddata] = useState();

  useEffect(() => {
    async function fetchLeaderboard() {
      let leaderboard = await SimulatorApis.getLeaderboard({
        payload: {
          // max: 10,
        },
        token,
        type: simulatorType,
      });
      if (leaderboard.data && leaderboard.data.success) {
        setleaderboarddata(leaderboard.data.data);
      }
    }
    fetchLeaderboard();
  }, [token]);

  return (
    <div className={styles.leaderboard}>
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
                <>
                  {item ? (
                    <div
                      className={styles.row}
                      key={item.user.id}
                      style={{
                        backgroundColor: index % 2 == 0 ? "#D9F2FF" : "#ffffff",
                      }}
                    >
                      <p className={styles.rank}>
                        {index < 10 ? index + 1 : <StarIcon />}
                      </p>
                      <p className={styles.name}>
                        {`${item.user.first_name ? item.user.first_name : ""} ${
                          item.user.last_name ? item.user.last_name : ""
                        }`}
                        {item.user.phone === userData.phone && " (you)"}
                      </p>
                      <p className={styles.score}>
                        {parseFloat(item.record.total_portfolio).toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}
