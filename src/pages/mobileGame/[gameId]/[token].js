import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import UnityScreen from "../../../components/Games/UnityScreen";
import styles from "../../../styles/Games/gameView.module.scss";
import GameApis from "../../../actions/apis/GameApis";

export default function GameView() {
  const gameRef = useRef();
  const router = useRouter();
  //   console.log("router", router);
  const { gameId, token } = router.query;
  const [gameData, setGameData] = useState();
  const [loading, setLoading] = useState(false);

  const sendDataToReactNativeApp = async () => {
    window &&
      window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage("Done");
  };

  useEffect(() => {
    async function fetchGameData() {
      setLoading(true);
      const res = await GameApis.gamedata({ id: gameId });
      if (res && res.data && res.data.data) {
        setGameData(res.data.data);
      }
      setLoading(false);
    }
    if (gameId && token) fetchGameData();
  }, [gameId, token]);

  const handleGameScoreupdate = async () => {
    let allGames = await GameApis.gamesList();
    allGames = allGames?.data?.success ? allGames.data.data : [];
    const game = allGames.filter((item) => item.id === gameData.id)[0];
    let res = await GameApis.unicoinreward(
      {
        gameId: gameData.id,
        unicoins: game.unicoinsReward,
      },
      token
    );
    if (res?.data?.success) {
      console.log("Score success rewards alloted");
      window &&
        window.ReactNativeWebView &&
        window.ReactNativeWebView.postMessage("score_update");
    } else {
      console.log(res?.data?.message || "");
    }
  };

  const handleGameClose = () => {
    handleGameScoreupdate();
    sendDataToReactNativeApp();
    mixpanel.track("Game Closed", { event: `Game closed` });
  };

  return (
    <div className={styles.gameView} ref={gameRef}>
      {gameData && (
        <UnityScreen
          data={gameData}
          handleGameExit={handleGameClose}
          loading={loading}
        />
      )}
    </div>
  );
}
