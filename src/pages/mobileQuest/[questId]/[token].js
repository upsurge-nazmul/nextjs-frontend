import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import KnowledgeQuestApi from "../../../actions/apis/KnowledgeQuestApi";
import UnityScreen from "../../../components/Games/UnityScreen";
import styles from "../../../styles/Games/gameView.module.scss";
import ActionArea from "../../../components/Games//ActionArea";

export default function GameView({
  game,
  setGame,
  handleDone = null,
  setUnicoins = () => {},
  setShowUnicoinsAwards = () => {},
}) {
  const gameRef = useRef();
  const router = useRouter();
  const { questId, token } = router.query;
  const [gameData, setGameData] = useState();
  const [loading, setLoading] = useState(false);

  const sendDataToReactNativeApp = async () => {
    window.ReactNativeWebView.postMessage("Done");
  };

  useEffect(() => {
    async function fetchGameData() {
      setLoading(true);
      const res = await KnowledgeQuestApi.getQuestFiles({ id: questId }, token);
      if (res && res.data && res.data.data) {
        setGameData(res.data.data);
      }
      setLoading(false);
    }
    if (questId && token) fetchGameData();
  }, []);

  const handleGameClose = () => {
    sendDataToReactNativeApp();
    mixpanel.track("Game Closed", { event: `Game closed` });
    setGame();
    setShowUnicoinsAwards(true);
    setUnicoins(4000);
  };

  // console.log("**********", gameData);

  return (
    <div className={styles.gameView} ref={gameRef}>
      {gameData && (
        <UnityScreen data={gameData} handleGameExit={handleGameClose} />
      )}
      {!loading && (
        <ActionArea
          onClose={handleGameClose}
          onDone={handleGameClose}
          fullScreen={false}
          showDone={handleDone}
        />
      )}
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  return {
    props: {},
  };
}
