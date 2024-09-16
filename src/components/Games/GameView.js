import React, { useContext, useEffect, useRef } from "react";
import GameApis from "../../actions/apis/GameApis";
import KnowledgeQuestApi from "../../actions/apis/KnowledgeQuestApi";
import { useState } from "react";
import UnityScreen from "./UnityScreen";
import styles from "../../styles/Games/gameView.module.scss";
import { isMobileOnly } from "react-device-detect";
import { MainContext } from "../../context/Main";

export default function GameView({
  allGames,
  game,
  setGame,
  handleQuestExit = () => {},
  handleQuestDone = () => {},
  isKq = false,
}) {
  const { setUnicoinsEarnedPopUp, setUnicoins } = useContext(MainContext);

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

  const handleGameScoreupdate = async () => {
    const game = allGames?.filter((item) => item.id === gameData.id)[0];
    let res = await GameApis.unicoinreward({
      gameId: gameData.id,
      unicoins: game.unicoinsReward,
    });
    if (res?.data?.success) {
      setUnicoinsEarnedPopUp(true);
      setUnicoins(game.unicoinsReward);
      console.log("Score success rewards alloted");
    } else {
      console.log(res?.data?.message || "");
    }
  };

  const handleGameClose = () => {
    mixpanel.track(`${isKq ? "Knowledge Quest" : "Game"} Closed`, {
      event: `Game closed`,
    });
    setFullScreen(false);
    if (document && document.fullscreenElement) document.exitFullscreen();
    setGame();
    if (isKq) {
      handleQuestExit();
    } else {
      handleGameScoreupdate();
    }
  };

  return (
    <div className={styles.gameView} ref={gameRef}>
      {gameData && (
        <UnityScreen
          data={gameData}
          handleGameExit={handleGameClose}
          handleQuestDone={handleQuestDone}
          // fullScreen={fullScreen}
          // showDone={handleDone}
          // loading={loading}
        />
      )}
    </div>
  );
}
