import React, { useCallback, useContext, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../../styles/Games/gameView.module.scss";
import GameLoading from "./GameLoading";
import { MainContext } from "../../context/Main";
import { useRouter } from "next/router";
import ActionArea from "./ActionArea";
import { gameUrl } from "../../utils/utils";

export default function UnityScreen({
  data = {},
  handleGameExit = () => {},
  handleQuestDone = () => {},
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
    loaderUrl: gameUrl(data.loaderUrl),
    dataUrl: gameUrl(data.dataUrl),
    frameworkUrl: gameUrl(data.frameworkUrl),
    codeUrl: gameUrl(data.codeUrl),
  });
  const router = useRouter();
  const { userdata } = useContext(MainContext);

  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  useEffect(
    function () {
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );

  const handleOnSceneLoaded = () => {
    if (isLoaded) {
      const json = JSON.stringify({
        userid: userdata?.user_id,
        token: userdata?.token,
      });
      sendMessage("GameData", "SetUserID", json);
    }
  };

  const handleExit = async () => {
    console.log("Unload called");
    if (isLoaded === false) {
      console.log("Is Loaded is false");
      return;
    }
    try {
      await unload();
      console.log("Unload success");
      handleGameExit();
    } catch (error) {
      console.error(`Unable to unload: ${error}`);
    }
  };

  const handleScoreupdate = async (score) => {
    let res = await GameApis.unicoinreward({ gameId: game });
    if (res?.data?.success) {
      console.log("Score success rewards alloted");
    } else {
      console.log(res?.data?.message || "");
    }
  };

  const handleKQdone = async (gameid, status) => {
    console.log("KQ_done success", gameid);
    try {
      if (status === "1") {
        handleQuestDone();
      }
    } catch (e) {
      console.log("KQ_done error", e);
    }
  };

  useEffect(() => {
    addEventListener("OnSeceneLoaded", handleOnSceneLoaded);
    addEventListener("Exit", handleExit);
    addEventListener("Score", handleScoreupdate);
    addEventListener("KQ_done", handleKQdone);
    return () => {
      removeEventListener("OnSeceneLoaded", handleOnSceneLoaded);
      removeEventListener("Exit", handleExit);
      removeEventListener("Score", handleScoreupdate);
      removeEventListener("KQ_done", handleKQdone);
    };
  }, [handleKQdone, handleOnSceneLoaded, handleScoreupdate, handleExit]);

  return (
    <>
      <Unity
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
        className={isLoaded ? styles.gameScreen : styles.hidden}
      />
      {/* <button onClick={handleSendMessage}>Send Message</button> */}
      <div className={!isLoaded ? styles.loadingArea : styles.hidden}>
        <GameLoading percentage={loadingProgression} />
      </div>
      {/* {!loading && (
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
      )} */}
    </>
  );
}
