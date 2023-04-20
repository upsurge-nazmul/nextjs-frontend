import React, { useCallback, useContext, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../../styles/Games/gameView.module.scss";
import GameLoading from "./GameLoading";
import { MainContext } from "../../context/Main";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { userdata } = useContext(MainContext);

  //This is called when the game is loaded and ready to receive messages
  //Sends the user id to the game
  useEffect(() => {
    if (isLoaded) {
      console.log("Game Loaded");
      sendMessage("GameData", "SetUserID", userdata?.user_id);
    }
  }, [isLoaded]);

  useEffect(() => {
    addEventListener("OnSeceneLoaded", () => {
      console.log("Scene Loaded Event called");
    });
    addEventListener("Exit", () => {
      router.push("/dashboard/k/games");
    });
    return () => {
      removeEventListener("OnSeceneLoaded", () => {});
      removeEventListener("Exit", () => {});
    };
  }, [addEventListener, removeEventListener]);

  return (
    <>
      <Unity
        unityProvider={unityProvider}
        className={isLoaded ? styles.gameScreen : styles.hidden}
      />
      {/* <button onClick={handleSendMessage}>Send Message</button> */}
      <div className={!isLoaded ? styles.loadingArea : styles.hidden}>
        <GameLoading percentage={loadingProgression} />
      </div>
    </>
  );
}
