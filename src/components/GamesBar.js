import React, { useEffect, useState } from "react";
import GameView from "./Games/GameView";
import styles from "../styles/GeneralComponents/gamebar.module.scss";
import AuthComponent from "./Auth/AuthComponent";

function GamesBar() {
  const [openGame, setOpenGame] = useState(false);
  const [timesGameOpened, settimesGameOpened] = useState(0);
  async function handlegameclick(title) {
    setOpenGame(title);
  }
  const [showauth, setshowauth] = useState(false);
  const [authmode, setauthmode] = useState("");
  return (
    <div className={styles.GameBarContainer}>
      <h1>Try 45-days FREE and exclusive learning experiences</h1>
      <AuthComponent
        showauth={showauth}
        setshowauth={setshowauth}
        authmode={authmode}
        setauthmode={setauthmode}
      />
      <div className={styles.gamesContainer}>
        <div className={styles.games}>
          <div className={styles.game}>
            <img
              className={styles.gameImg}
              src="/images/games/money-dash.png"
              alt="Money Dash"
            />
            <button
              onClick={() => {
                if (timesGameOpened > 1) {
                  setshowauth(true);
                  setauthmode("parentChild");
                } else if(timesGameOpened === 0 || timesGameOpened === 1) {
                  handlegameclick("MoneyDash");
                  settimesGameOpened(timesGameOpened + 1);
                }
              }}
              className={styles.playButton}
            >
              Play
            </button>
          </div>
          <div className={styles.game}>
            <img
              className={styles.gameImg}
              src="/images/games/need-and-want.png"
              alt="Need and Want"
            />
            <button
              onClick={() => {
                if (timesGameOpened > 1) {
                  setshowauth(true);
                  setauthmode("parentChild");
                } else if(timesGameOpened === 0 || timesGameOpened === 1) {
                  handlegameclick("NeedOrWant");
                  settimesGameOpened(timesGameOpened + 1);
                }
              }}
              className={styles.playButton}
            >
              Play
            </button>
          </div>
          <div className={styles.game}>
            <img
              className={styles.gameImg}
              src="/images/games/snake-and-ladders.png"
              alt="Snake And Ladders"
            />
            <button
              onClick={() => {
                if (timesGameOpened > 1) {
                  setshowauth(true);
                  setauthmode("parentChild");
                } else if(timesGameOpened === 0 || timesGameOpened === 1) {
                  handlegameclick("SnakeAndLadders");
                  settimesGameOpened(timesGameOpened + 1);
                  
                }
              }}
              className={styles.playButton}
            >
              Play
            </button>
          </div>
        </div>
      </div>
      <div className={styles.authContainer}>
      <AuthComponent
        showauth={showauth}
        setshowauth={setshowauth}
        authmode={authmode}
        setauthmode={setauthmode}
        />
        </div>
      {openGame ? <GameView game={openGame} setGame={setOpenGame} /> : ""}
    </div>
  );
}

export default GamesBar;
