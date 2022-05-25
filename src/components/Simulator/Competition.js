import { useState, useEffect } from "react";
import styles from "../../styles/StockSimulator/leaderboard.module.scss";
import SimulatorApis from "../../actions/apis/SimulatorApis";
import StarIcon from "@mui/icons-material/Star";
import { toIndianFormat } from "../../helpers/currency";

const Options = [
  { name: "Overall", value: "overall", accessor: "Total Portfolio" },
  { name: "Daily", value: "daily", accessor: "Daily Return" },
  { name: "Weekly", value: "weekly", accessor: "Weekly Return" },
  { name: "Monthly", value: "monthly", accessor: "Monthly Return" },
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
      } else setleaderboarddata();
    }
    if (selected === Options[0].value) {
      fetchLeaderboard();
    } else {
      fetchDailyCompetitionData(selected);
    }
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
            <p className={styles.score}>
              {Options.find((item) => item.value === selected).accessor}
            </p>
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
                        {selected === Options[0].value
                          ? toIndianFormat(
                              parseFloat(item.record.total_portfolio)
                            )
                          : selected === Options[1].value
                          ? parseFloat(item.record.current_return).toFixed(2)
                          : parseFloat(item.cumulated_return).toFixed(2)}
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
