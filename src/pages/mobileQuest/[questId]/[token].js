import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import KnowledgeQuestApi from "../../../actions/apis/KnowledgeQuestApi";
import UnityScreen from "../../../components/Games/UnityScreen";
import styles from "../../../styles/Games/gameView.module.scss";

export default function GameView() {
  const gameRef = useRef();
  const router = useRouter();
  // console.log("router", router);
  const { questId, token } = router.query;
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
      const res = await KnowledgeQuestApi.getQuestFiles({ id: questId }, token);
      if (res && res.data && res.data.data) {
        setGameData(res.data.data);
      }
      setLoading(false);
    }
    if (questId && token) fetchGameData();
  }, [questId, token]);

  const handleGameClose = () => {
    sendDataToReactNativeApp();
    mixpanel.track("Quest Closed", { event: `Quest closed` });
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
