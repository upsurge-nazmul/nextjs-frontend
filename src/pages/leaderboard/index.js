import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Leaderboard/leaderboard.module.scss";
export default function LeaderBoard() {
  const router = useRouter();
  const { calculatorName } = router.query;
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const demodata = [
    {
      name: "Izzy Backyet",
      score: 250,
    },
    {
      name: "Roopam Sharma",
      score: 240,
    },
    {
      name: "Aadvik Jain",
      score: 230,
    },
    {
      name: "Darlene Robertson",
      score: 210,
    },
    {
      name: "Roopam Sharma",
      score: 100,
    },
    {
      name: "Aadvik Jain",
      score: 100,
    },
    {
      name: "Darlene Robertson",
      score: 100,
    },
    {
      name: "Roopam Sharma",
      score: 100,
    },
    {
      name: "Aadvik Jain",
      score: 100,
    },
    {
      name: "Darlene Robertson",
      score: 100,
    },
    {
      name: "Roopam Sharma",
      score: 100,
    },
    {
      name: "Aadvik Jain",
      score: 100,
    },
    {
      name: "Darlene Robertson",
      score: 100,
    },
    {
      name: "Roopam Sharma",
      score: 100,
    },
    {
      name: "Aadvik Jain",
      score: 100,
    },
    {
      name: "Darlene Robertson",
      score: 100,
    },
  ];
  return (
    <div className={styles.leaderboard}>
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.main}>
        <img
          className={styles.image}
          src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <div className={styles.heading}>
          <p className={styles.name}>Finance Ludo</p>
          <p className={styles.text}>Leaderboard</p>
        </div>
        <div className={styles.table}>
          <div className={styles.row}>
            <p className={styles.rank}>Rank</p>
            <p className={styles.name}>Name</p>
            <p className={styles.score}>Score</p>
          </div>
          {demodata.map((item, index) => {
            return (
              <div
                className={styles.row}
                style={{
                  backgroundColor: index % 2 == 0 ? "#D9F2FF" : "#ffffff",
                }}
              >
                <p className={styles.rank}>{index + 1}</p>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.score}>{item.score}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
