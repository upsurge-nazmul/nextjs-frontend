import React, { useEffect, useRef } from "react";
import GameApis from "../../actions/apis/GameApis";
import { useState } from "react";
import UnityScreen from "./UnityScreen";
import styles from "../../styles/Games/gameView.module.scss";
import { isMobileOnly } from "react-device-detect";
import ActionArea from "./ActionArea";

export default function GameView({
  chapterId,
  game,
  setGame,
  externalId = null,
  handleDone = null,
  setUnicoins = () => {},
  setShowUnicoinsAwards = () => {},
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
      let res = await GameApis.gamedata({ id: game });
      if (res && res.data && res.data.data) {
        setGameData(res.data.data);
      }
      setLoading(false);
    }
    fetchGameData();
  }, []);

  return (
    <div className={styles.gameView} ref={gameRef}>
      {gameData && <UnityScreen data={gameData} />}
      {!loading && (
        <ActionArea
          onClose={() => {
            setFullScreen(false);
            document.exitFullscreen();
            mixpanel.track("Game Closed", { event: `Game closed` });
            setGame();
            setShowUnicoinsAwards(true);
            setUnicoins(4000);
          }}
          onDone={() => {
            handleDone();
            mixpanel.track("Knowledge Quest", {
              event: `Quest Finished ${chapterId}`,
            });
            setFullScreen(false);
            document.exitFullscreen();
            setGame();
          }}
          fullScreen={fullScreen}
          showDone={handleDone}
        />
      )}
    </div>
  );
}
