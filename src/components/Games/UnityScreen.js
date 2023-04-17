import React, { useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../../styles/Games/gameView.module.scss";
import GameLoading from "./GameLoading";

export default function UnityScreen({ data }) {
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage, // (gameObjectName: string, methodName: string, parameter)
    addEventListener, // (eventNamme: string, callback: (..params))
    removeEventListener, // (eventNamme: string, callback: (..params))
  } = useUnityContext({
    loaderUrl: data.loaderUrl,
    dataUrl: data.dataUrl,
    frameworkUrl: data.frameworkUrl,
    codeUrl: data.codeUrl,
  });

  function handleSendMessage() {
    sendMessage("GameController", "sendMessage", 100);
  }

  const handleReceiveMessage = useCallback((params) => {
    console.log("params received", params);
  });

  useEffect(() => {
    addEventListener("SetReceivedParams", handleReceiveMessage);
    return () => {
      removeEventListener("SetReceivedParams", handleReceiveMessage);
    };
  }, [addEventListener, removeEventListener, handleReceiveMessage]);

  return (
    <>
      <Unity
        unityProvider={unityProvider}
        className={isLoaded ? styles.gameScreen : styles.hidden}
      />
      <button onClick={handleSendMessage}>Send Message</button>
      <div className={!isLoaded ? styles.loadingArea : styles.hidden}>
        <GameLoading percentage={loadingProgression} />
      </div>
    </>
  );
}
