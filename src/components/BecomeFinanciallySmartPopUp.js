import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/GeneralComponents/trendingGames.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function BecomeFinanciallySmartPopUp({ setShowBecomeFinanciallySmart }) {
  const router = useRouter();
  console.log("Showing");
  return (
    <div className={styles.trendingGames}>
      <div
        className={styles.background}
        onClick={() => {
          setShowBecomeFinanciallySmart(false);
        }}
      ></div>
      <div className={styles.block}>
        <div
          className={styles.cross}
          onClick={() => {
            setShowBecomeFinanciallySmart(false);
          }}
        >
          <CancelOutlinedIcon className={styles.icon} />
        </div>
        <h2>Become Financially Smart!</h2>
        <div className={styles.images}>
          <div className={styles.image}>
            <div className={styles.coverName}>Money 101</div>
            <img
              className={styles.gameImg}
              src="/trendingGames.png"
              alt="trendingGame"
            />
            <button className={styles.playButton}>Try Now</button>
          </div>
          <div className={styles.image}>
            <div className={styles.coverName}>Money 101</div>
            <img
              className={styles.gameImg}
              src="/trendingGames.png"
              alt="trendingGame"
            />
            <button className={styles.playButton}>Try Now</button>
          </div>
          <div className={styles.image}>
            <div className={styles.coverName}>Money 101</div>
            <img
              className={styles.gameImg}
              src="/trendingGames.png"
              alt="trendingGame"
            />
            <button className={styles.playButton}>Try Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeFinanciallySmartPopUp;
