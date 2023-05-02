import React, { useState } from "react";
import styles from "../styles/GeneralComponents/trendingGames.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Game_Data } from "../static_data/Game_Data";
import { useRouter } from "next/router";


function TrendingGamesPopUp({ setShowTrendingGames,setOpenGame,setGameOpened,setTendingGamesManuallyClosed,userdata }) {
  const router = useRouter();
  async function handlegameclick(title) {
    setOpenGame(title);
    setGameOpened(title);
    setShowTrendingGames(false);
    setTendingGamesManuallyClosed(true);
  }
  async function handleGameClickPostSignUp(pushto = null, gameName = null) {
    await setShowTrendingGames(false);
    pushto = pushto ? pushto.split("/")[pushto.split("/").length - 1] : "";
    router.push("/dashboard/k/game/" + (pushto ? pushto : gameName));
  }
  return (
    <div className={styles.trendingGames}>
      <div
        className={styles.background}
        onClick={() => {
          
          setShowTrendingGames(false);
          if(!userdata){
            setTendingGamesManuallyClosed(true);
          }
        }}
        ></div>
      <div className={styles.block}>
        <div
          className={styles.cross}
          onClick={() => {
            setShowTrendingGames(false);
            if(!userdata){
              setTendingGamesManuallyClosed(true);
            }
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
              src="/images/games/dont-overspend.png"
              alt="Don't Overspend"
            />
            <button
              onClick={() => {
                if(!userdata){
                  handlegameclick("DontOverspend");
                }
                else{
                  handleGameClickPostSignUp(Game_Data["DontOverspend"].pushto,"DontOverspend");
                }
              }}
              className={styles.playButton}
              >
              Play
            </button>
          </div>
          <div className={styles.image}>
            <img
              className={styles.gameImg}
              src="/images/games/balance-builder.png"
              alt="trendingGame"
              />
            <button 
              onClick={() => {
                if(!userdata){
                  handlegameclick("BalanceBuilder");
                }
                else{
                  handleGameClickPostSignUp(Game_Data["BalanceBuilder"].pushto,"BalanceBuilder");
                }
              }}
              className={styles.playButton}>Play</button>
          </div>
          <div className={styles.image}>
            <img
              className={styles.gameImg}
              src="/images/games/high-and-low.png"
              alt="trendingGame"
              />
            <button
              onClick={() => {
                if(!userdata){
                  handlegameclick("HighAndLow");
                }
                else{
                  handleGameClickPostSignUp(Game_Data["HighAndLow"].pushto,"HighAndLow");
                }
              }}
              className={styles.playButton}>Play</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingGamesPopUp;
