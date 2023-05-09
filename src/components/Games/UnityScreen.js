import React, { useCallback, useContext, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../../styles/Games/gameView.module.scss";
import GameLoading from "./GameLoading";
import { MainContext } from "../../context/Main";
import { useRouter } from "next/router";
import ActionArea from "./ActionArea";

export default function UnityScreen({
  data = {},
  handleGameExit = () => {},
  fullScreen = false,
  showDone = false,
  loading = false,
}) {
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage, // (gameObjectName: string, methodName: string, parameter)
    addEventListener, // (eventNamme: string, callback: (..params))
    removeEventListener, // (eventNamme: string, callback: (..params))
    unload,
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
    addEventListener("Exit", async () => {
      console.log("Exiting Game");
      await unload();
      handleGameExit();
    });
    addEventListener("Score", async function (score) {
      let res = await GameApis.unicoinreward({ gameId: game });
      if (res?.data?.success) {
        console.log("Score success rewards alloted");
      } else {
        console.log(res?.data?.message || "");
      }
    });
    return () => {
      removeEventListener("OnSeceneLoaded", () => {});
      removeEventListener("Exit", () => {});
      removeEventListener("Score", () => {});
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
      {!loading && (
        <ActionArea
          onClose={async () => {
            await unload();
            handleGameExit();
          }}
          onDone={async () => {
            await unload();
            handleGameExit();
          }}
          fullScreen={fullScreen}
          showDone={showDone}
        />
      )}
    </>
  );
}
