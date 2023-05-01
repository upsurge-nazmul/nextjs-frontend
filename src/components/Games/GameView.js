import React, { useEffect, useRef } from "react";
import GameApis from "../../actions/apis/GameApis";
import KnowledgeQuestApi from "../../actions/apis/KnowledgeQuestApi";
import { useState } from "react";
import UnityScreen from "./UnityScreen";
import styles from "../../styles/Games/gameView.module.scss";
import { isMobileOnly } from "react-device-detect";
import ActionArea from "./ActionArea";

export default function GameView({
  game,
  setGame,
  handleDone = null,
  setUnicoins = () => {},
  setShowUnicoinsAwards = () => {},
  isKq = false,
}) {
  const gameRef = useRef();
  const [gameData, setGameData] = useState();
  const [loading, setLoading] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    if (gameRef && gameRef.current) {
      if (gameRef.current.requestFullscreen) {
        gameRef.current.requestFullscreen();
        setFullScreen(true);
        if (isMobileOnly) {
          if (window.screen.orientation.lock) {
            window.screen.orientation
              .lock("landscape")
              .then(() => console.log("orientaion landscape"))
              .catch((e) => console.log(e.message));
          } else {
            console.log("Screen rotation is not supported");
          }
        }
      }
      if (gameRef.current.webkitRequestFullScreen)
        gameRef.current.webkitRequestFullScreen();
    }
  }, [gameRef]);

  useEffect(() => {
    async function fetchGameData() {
      setLoading(true);
      let res;
      if (isKq) {
        res = await KnowledgeQuestApi.getQuestFiles({ id: game });
      } else {
        res = await GameApis.gamedata({ id: game });
      }
      if (res && res.data && res.data.data) {
        setGameData(res.data.data);
      }
      setLoading(false);
    }
    fetchGameData();
  }, []);

  const handleGameClose = () => {
    handleDone ? handleDone() : () => {};
    mixpanel.track("Game Closed", { event: `Game closed` });
    setFullScreen(false);
    document.exitFullscreen();
    setGame();
    setShowUnicoinsAwards(true);
    setUnicoins(4000);
  };

  return (
    <div className={styles.gameView} ref={gameRef}>
      {gameData && (
        <UnityScreen data={gameData} handleGameExit={handleGameClose} />
      )}
      {!loading && (
        <ActionArea
          onClose={handleGameClose}
          onDone={handleGameClose}
          fullScreen={fullScreen}
          showDone={handleDone}
        />
      )}
    </div>
  );
}
