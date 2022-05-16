import { useState, useEffect } from "react";
import styles from "../../styles/StockSimulator/leaderboard.module.scss";
import SimulatorApis from "../../actions/apis/SimulatorApis";
import StarIcon from "@mui/icons-material/Star";

const Options = [
  { name: "Daily", value: "daily" },
  { name: "Weekly", value: "weekly" },
  { name: "Monthly", value: "monthly" },
];

export default function Competition({ userData, token, simulatorType }) {
  const [leaderboarddata, setleaderboarddata] = useState();
  const [selected, setselected] = useState(Options[0].value);

  async function changeleaderboard(type) {
    setselected(type);
  }

  useEffect(() => {
    async function fetchDailyCompetitionData(duration) {
      setleaderboarddata(null);
      let leaderboard = await SimulatorApis.getDailyCompetition({
        payload: {
          // max: 10,
        },
        token,
        type: simulatorType,
        duration,
      });
      if (leaderboard.data && leaderboard.data.success) {
        setleaderboarddata(leaderboard.data.data);
      } else setleaderboarddata();
    }
    fetchDailyCompetitionData(selected);
  }, [token, selected]);

  return (
    <div className={styles.leaderboard}>
      <div className={styles.holder}>
        {Options.map((item) => (
          <p
            className={`${styles.heading} ${
              selected === item.value && styles.selected
            }`}
            key={item.value}
            onClick={() => {
              setleaderboarddata(null);
              changeleaderboard(item.value);
            }}
          >
            {item.name}
          </p>
        ))}
      </div>
      <div className={styles.section}>
        <div className={styles.table}>
          <div className={styles.row}>
            <p className={styles.rank}>Rank</p>
            <p className={styles.name}>Name</p>
            <p className={styles.score}>Current Return</p>
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
                    {selected === Options[0].value
                      ? parseFloat(item.record.current_return).toFixed(2)
                      : parseFloat(item.cumulated_return).toFixed(2)}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
