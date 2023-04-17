import React, { useState } from "react";
import styles from "../styles/GeneralComponents/trendingGames.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";


function TrendingGamesPopUp({ setShowTrendingGames,setOpenGame,setGameOpened  }) {
  async function handlegameclick(title) {
    setOpenGame(title);
    setGameOpened(title);
    setShowTrendingGames(false);
  }
  return (
    <div className={styles.trendingGames}>
      <div
        className={styles.background}
        onClick={() => {
          setShowTrendingGames(false);
        }}
      ></div>
      <div className={styles.block}>
        <div
          className={styles.cross}
          onClick={() => {
            setShowTrendingGames(false);
          }}
        >
          <CancelOutlinedIcon className={styles.icon} />
        </div>
     
        <h2>Trending Games...</h2>
        <p className={styles.subheading}>Play games and earn prizes</p>
        <div className={styles.images}>
          <div className={styles.image}>
            <img
              className={styles.gameImg}
              src="/trendingGames.png"
              alt="trendingGame"
            />
            <button
              onClick={() => {
                handlegameclick("DontOverspend");
              }}
              className={styles.playButton}
              >
              Play
            </button>
          </div>
          <div className={styles.image}>
            <img
              className={styles.gameImg}
              src="/trendingGames.png"
              alt="trendingGame"
              />
            <button 
              onClick={() => {
                handlegameclick("DontOverspend");
              }}
              className={styles.playButton}>Play</button>
          </div>
          <div className={styles.image}>
            <img
              className={styles.gameImg}
              src="/trendingGames.png"
              alt="trendingGame"
              />
            <button
              onClick={() => {
                handlegameclick("DontOverspend");
              }}
             className={styles.playButton}>Play</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingGamesPopUp;
