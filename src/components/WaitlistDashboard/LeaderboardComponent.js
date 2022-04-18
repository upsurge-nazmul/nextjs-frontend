import { useRouter } from "next/dist/client/router";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import QuizApis from "../../actions/apis/QuizApis";
import { getCookie } from "../../actions/cookieUtils";
import { MainContext } from "../../context/Main";
import styles from "../../styles/WaitlistDashboard/leaderboard.module.scss";
export default function LeaderboardComponent({
  for_game,
  data,
  highest,
  quiz_rank,
  first_name,
  parent,
  kid,
}) {
  const [selected, setselected] = useState(for_game ? for_game : "Quiz");
  const [leaderboarddata, setleaderboarddata] = useState(data || []);
  const router = useRouter();
  const [optionsbackup, setoptionsbackup] = useState([
    "Overall",
    "Quiz",
    "Ludo",
  ]);
  const { userdata } = useContext(MainContext);
  const [options, setoptions] = useState(optionsbackup);
  async function getludoleaderboard() {
    let leaderboard = await FreeGameApis.getludoleaderboard(
      null,
      getCookie("accesstoken")
    );
    console.log(leaderboard?.data?.data);
    setleaderboarddata([]);
    setleaderboarddata(leaderboard?.data?.data || []);
  }
  async function getquizleaderboard() {
    let leaderboard = await QuizApis.leaderboard({
      onlychild: kid ? true : false,
    });
    setleaderboarddata([]);
    setleaderboarddata(leaderboard?.data?.data || []);
  }
  async function getoverallleaderboard() {
    let leaderboard = await DashboardApis.getoverallleaderboard(
      null,
      getCookie("accesstoken")
    );
    setleaderboarddata([]);
    setleaderboarddata(leaderboard?.data?.data || []);
  }

  async function changeleaderboard(type) {
    setselected(type);
    if (type === "Ludo") {
      getludoleaderboard();
    } else if (type === "Quiz") {
      getquizleaderboard();
    } else if (type === "Money Ace") {
      setleaderboarddata([]);
    } else if (type === "Stock Market Simulator") {
      setleaderboarddata([]);
    } else {
      getoverallleaderboard();
    }
  }

  useEffect(() => {
    if (router.query.ludo) {
      getludoleaderboard();
      setselected("Ludo");
    }
  }, []);

  return (
    <div className={styles.leaderboard}>
      <div className={styles.holder}>
        {/* <p className={`${styles.heading} ${styles.selected}`}>{selected}</p> */}
        {options.map((item, index) => (
          <p
            className={`${styles.heading} ${
              selected === item && styles.selected
            }`}
            key={item + index}
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
                key={item?.id || item.name + index}
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
          {selected === "Quiz" && quiz_rank > 15 && (
            <div
              className={styles.row}
              key={"sdaoijwqz"}
              style={{
                backgroundColor: data.length % 2 == 0 ? "#D9F2FF" : "#ffffff",
                padding: "20px 40px",
              }}
            >
              <p className={styles.rank}>{quiz_rank || "Your highest"}</p>
              <p className={styles.name}>{quiz_rank && first_name}</p>
              <p className={styles.score}>{highest}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
